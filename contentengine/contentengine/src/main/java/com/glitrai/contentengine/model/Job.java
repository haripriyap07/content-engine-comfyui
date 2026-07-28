package com.glitrai.contentengine.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName;

    @Column(length = 1000)
    private String productDescription;

    private String productImage;

    @Column(length = 2000)
    private String generatedPrompt;

    @Column(length = 2000)
    private String enhancedPrompt;

    @Column(length = 1000)
    private String outputImageUrl;

    private String status;

    private LocalDateTime createdAt;

    public Job() {}

    public Job(String productName, String productDescription, String productImage) {
        this.productName = productName;
        this.productDescription = productDescription;
        this.productImage = productImage;
        this.status = "PENDING";
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }
    public String getProductDescription() { return productDescription; }
    public void setProductDescription(String productDescription) { this.productDescription = productDescription; }
    public String getProductImage() { return productImage; }
    public void setProductImage(String productImage) { this.productImage = productImage; }
    public String getGeneratedPrompt() { return generatedPrompt; }
    public void setGeneratedPrompt(String generatedPrompt) { this.generatedPrompt = generatedPrompt; }
    public String getEnhancedPrompt() { return enhancedPrompt; }
    public void setEnhancedPrompt(String enhancedPrompt) { this.enhancedPrompt = enhancedPrompt; }
    public String getOutputImageUrl() { return outputImageUrl; }
    public void setOutputImageUrl(String outputImageUrl) { this.outputImageUrl = outputImageUrl; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}