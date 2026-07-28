package com.glitrai.contentengine.service;

import com.glitrai.contentengine.model.Job;
import com.glitrai.contentengine.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class GenerationService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private GeminiService geminiService;

    @Async
    public void processJobAsync(Long jobId) {
        Job job = jobRepository.findById(jobId).orElse(null);
        if (job == null) {
            return;
        }

        try {
            job.setStatus("PROCESSING");
            jobRepository.save(job);

            String prompt = geminiService.generatePrompt(
                    job.getProductName(),
                    job.getProductDescription() != null ? job.getProductDescription() : ""
            );

            job.setGeneratedPrompt(prompt);

            String encodedPrompt = URLEncoder.encode(prompt, StandardCharsets.UTF_8)
                    .replaceAll("\\+", "%20");

            String imageUrl = "https://image.pollinations.ai/prompt/" + encodedPrompt;
            job.setOutputImageUrl(imageUrl);

            job.setStatus("COMPLETED");
        } catch (Exception e) {
            e.printStackTrace();
            job.setStatus("FAILED");
        } finally {
            jobRepository.save(job);
        }
    }
}