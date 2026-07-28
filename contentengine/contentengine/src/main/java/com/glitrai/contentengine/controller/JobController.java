package com.glitrai.contentengine.controller;

import com.glitrai.contentengine.model.Job;
import com.glitrai.contentengine.repository.JobRepository;
import com.glitrai.contentengine.service.GenerationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private GenerationService generationService;

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "UP", "service", "Mini Content Engine"));
    }

    @PostMapping("/api/generate")
    public ResponseEntity<Job> generateContent(@RequestBody Map<String, String> payload) {
        String name = payload.get("productName");
        String desc = payload.get("productDescription");
        String image = payload.get("productImage");

        Job job = new Job(name, desc, image);
        Job savedJob = jobRepository.save(job);

        generationService.processJobAsync(savedJob.getId());

        return ResponseEntity.ok(savedJob);
    }

    @GetMapping("/api/jobs/{id}")
    public ResponseEntity<Job> getJob(@PathVariable Long id) {
        return jobRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/api/jobs")
    public ResponseEntity<List<Job>> getAllJobs() {
        return ResponseEntity.ok(jobRepository.findAllByOrderByIdDesc());
    }
}