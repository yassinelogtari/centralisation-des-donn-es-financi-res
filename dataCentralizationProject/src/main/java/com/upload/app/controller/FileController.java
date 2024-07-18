package com.upload.app.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.upload.app.dto.FileProjection;
import com.upload.app.entity.File;
import com.upload.app.entity.FilledFile;
import com.upload.app.entity.FrequenceSaisie;
import com.upload.app.entity.UserType;
import com.upload.app.repository.FileRepository;
import com.upload.app.repository.FilledFileRepository;
import com.upload.app.service.FileService;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@RestController
@RequestMapping("api/file")
@CrossOrigin(origins = "http://localhost:4200")
public class FileController {

    @Autowired
    private FileRepository fileRepository;
    @Autowired
    private FileService fileService ;
    @Autowired
    private FilledFileRepository filledFileRepository;
    
    @PersistenceContext
    private EntityManager entityManager;
    
    
    //admin upload
    @PostMapping
    public ResponseEntity<List<File>> createNewFiles(@RequestParam String name,
                                                     @RequestParam String details,
                                                     @RequestPart("files") List<MultipartFile> files,
                                                     @RequestParam(required = false) Map<String, String> frequenceSaisie,
                                                     @RequestParam Set<UserType> userTypes) throws IOException {
        List<File> savedFiles = new ArrayList<>();
        
        FrequenceSaisie frequenceSaisieEntity = new FrequenceSaisie();
        if (frequenceSaisie != null) {
            frequenceSaisie.forEach((key, value) -> {
                switch (key.toLowerCase()) {
                    case "january": frequenceSaisieEntity.setJanuary(Boolean.parseBoolean(value)); break;
                    case "february": frequenceSaisieEntity.setFebruary(Boolean.parseBoolean(value)); break;
                    case "march": frequenceSaisieEntity.setMarch(Boolean.parseBoolean(value)); break;
                    case "april": frequenceSaisieEntity.setApril(Boolean.parseBoolean(value)); break;
                    case "may": frequenceSaisieEntity.setMay(Boolean.parseBoolean(value)); break;
                    case "june": frequenceSaisieEntity.setJune(Boolean.parseBoolean(value)); break;
                    case "july": frequenceSaisieEntity.setJuly(Boolean.parseBoolean(value)); break;
                    case "august": frequenceSaisieEntity.setAugust(Boolean.parseBoolean(value)); break;
                    case "september": frequenceSaisieEntity.setSeptember(Boolean.parseBoolean(value)); break;
                    case "october": frequenceSaisieEntity.setOctober(Boolean.parseBoolean(value)); break;
                    case "november": frequenceSaisieEntity.setNovember(Boolean.parseBoolean(value)); break;
                    case "december": frequenceSaisieEntity.setDecember(Boolean.parseBoolean(value)); break;
                }
            });
        }

        for (MultipartFile file : files) {
            File fileEntity = File.builder()
                .name(name)
                .details(details)
                .filename(file.getOriginalFilename()) 
                .displayPicture(file.getBytes())
                .mimeType(file.getContentType())
                .frequenceSaisie(frequenceSaisieEntity)
                .build();
            fileEntity.setUserType(userTypes);
            fileRepository.save(fileEntity);
            savedFiles.add(fileEntity);
        }

        return ResponseEntity.ok(savedFiles);
    }

    // get all files
    @GetMapping
    public ResponseEntity<List<File>> getAll() {
        List<File> fileList = fileRepository.findAll();
        return ResponseEntity.ok(fileList);
    }

    // find byId file
    @GetMapping("/{id}")
    public ResponseEntity<File> getFileById(@PathVariable Long id) {
        File fileEntity = fileRepository.findById(id).orElse(null);
        if (fileEntity == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(fileEntity);
    }

    // download files
    @GetMapping("/download/{id}")
    public ResponseEntity<InputStreamResource> downloadFile(@PathVariable Long id) {
        File fileEntity = fileRepository.findById(id).orElse(null);
        if (fileEntity == null || fileEntity.getDisplayPicture() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(fileEntity.getDisplayPicture());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(fileEntity.getMimeType()));
        headers.setContentDispositionFormData("attachment", fileEntity.getFilename());

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentLength(fileEntity.getDisplayPicture().length)
                .body(new InputStreamResource(byteArrayInputStream));
    }

    // update file
    @PutMapping("/{id}")
    public ResponseEntity<File> updateFile(@PathVariable Long id,
                                           @RequestParam String name,
                                           @RequestParam String details,
                                           @RequestPart("files") List<MultipartFile> files,
                                           @RequestParam(required = false) Map<String, String> frequenceSaisie,
                                           @RequestParam Set<UserType> userTypes) throws IOException {
        File fileEntity = fileRepository.findById(id).orElse(null);
        if (fileEntity == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        FrequenceSaisie frequenceSaisieEntity = fileEntity.getFrequenceSaisie();
        if (frequenceSaisie != null) {
            frequenceSaisie.forEach((key, value) -> {
                switch (key.toLowerCase()) {
                    case "january": frequenceSaisieEntity.setJanuary(Boolean.parseBoolean(value)); break;
                    case "february": frequenceSaisieEntity.setFebruary(Boolean.parseBoolean(value)); break;
                    case "march": frequenceSaisieEntity.setMarch(Boolean.parseBoolean(value)); break;
                    case "april": frequenceSaisieEntity.setApril(Boolean.parseBoolean(value)); break;
                    case "may": frequenceSaisieEntity.setMay(Boolean.parseBoolean(value)); break;
                    case "june": frequenceSaisieEntity.setJune(Boolean.parseBoolean(value)); break;
                    case "july": frequenceSaisieEntity.setJuly(Boolean.parseBoolean(value)); break;
                    case "august": frequenceSaisieEntity.setAugust(Boolean.parseBoolean(value)); break;
                    case "september": frequenceSaisieEntity.setSeptember(Boolean.parseBoolean(value)); break;
                    case "october": frequenceSaisieEntity.setOctober(Boolean.parseBoolean(value)); break;
                    case "november": frequenceSaisieEntity.setNovember(Boolean.parseBoolean(value)); break;
                    case "december": frequenceSaisieEntity.setDecember(Boolean.parseBoolean(value)); break;
                }
            });
        }

        fileEntity.setName(name);
        fileEntity.setDetails(details);

        if (!files.isEmpty()) {
            MultipartFile file = files.get(0);
            fileEntity.setDisplayPicture(file.getBytes());
            fileEntity.setMimeType(file.getContentType());
            fileEntity.setFilename(file.getOriginalFilename());
        }

        fileEntity.setUserType(userTypes);
        fileRepository.save(fileEntity);

        return ResponseEntity.ok(fileEntity);
    }

    // delete file
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFile(@PathVariable Long id) {
        fileRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // get file count
    @GetMapping("/count")
    public ResponseEntity<Long> countFiles() {
        long count = fileService.countFiles();
        return ResponseEntity.ok(count);
    }
    
    // get userType
    @GetMapping("/userType/{userType}")
    public ResponseEntity<List<FileProjection>> getFilesByUserType(@PathVariable String userType) {
        List<FileProjection> files = fileService.getFileProjectionsByUserType(userType);
        return ResponseEntity.ok(files);
    }
    
    @PostMapping("/filled")
    @Transactional
    public ResponseEntity<List<FilledFile>> createNewFilledFiles(@RequestPart("files") List<MultipartFile> files) throws IOException {
        List<FilledFile> savedFiles = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();
        int currentMonth = now.getMonthValue();

        for (MultipartFile file : files) {
            File normalFile = fileRepository.findByFilename(file.getOriginalFilename());

            if (normalFile != null) {
                FilledFile existingFile = filledFileRepository.findByFilename(file.getOriginalFilename());

                if (existingFile != null) {
                    entityManager.clear();
                    updateFrequenceSaisie(existingFile.getFrequenceSaisie(), currentMonth);
                    existingFile.setDisplayPicture(file.getBytes());
                    existingFile.setMimeType(file.getContentType());
                    existingFile.setUploadDate(now);
                    existingFile.setUploadDateInFrequence(compareFrequences(existingFile.getFrequenceSaisie(), normalFile.getFrequenceSaisie()));

                    filledFileRepository.save(existingFile);
                    savedFiles.add(existingFile);
                } else {
                    FrequenceSaisie frequenceSaisie = new FrequenceSaisie();
                    updateFrequenceSaisie(frequenceSaisie, currentMonth);

                    FilledFile filledFileEntity = FilledFile.builder()
                            .filename(file.getOriginalFilename())
                            .displayPicture(file.getBytes())
                            .mimeType(file.getContentType())
                            .uploadDate(now)
                            .frequenceSaisie(frequenceSaisie)
                            .isUploadDateInFrequence(compareFrequences(frequenceSaisie, normalFile.getFrequenceSaisie()))
                            .build();
                    filledFileRepository.save(filledFileEntity);
                    savedFiles.add(filledFileEntity);
                }
            }
        }

        return ResponseEntity.ok(savedFiles);
    }

    private boolean compareFrequences(FrequenceSaisie filledFrequence, FrequenceSaisie normalFrequence) {
        return filledFrequence.isJanuary() == normalFrequence.isJanuary() &&
               filledFrequence.isFebruary() == normalFrequence.isFebruary() &&
               filledFrequence.isMarch() == normalFrequence.isMarch() &&
               filledFrequence.isApril() == normalFrequence.isApril() &&
               filledFrequence.isMay() == normalFrequence.isMay() &&
               filledFrequence.isJune() == normalFrequence.isJune() &&
               filledFrequence.isJuly() == normalFrequence.isJuly() &&
               filledFrequence.isAugust() == normalFrequence.isAugust() &&
               filledFrequence.isSeptember() == normalFrequence.isSeptember() &&
               filledFrequence.isOctober() == normalFrequence.isOctober() &&
               filledFrequence.isNovember() == normalFrequence.isNovember() &&
               filledFrequence.isDecember() == normalFrequence.isDecember();
    }

    private void updateFrequenceSaisie(FrequenceSaisie frequenceSaisie, int currentMonth) {
        switch (currentMonth) {
            case 1: frequenceSaisie.setJanuary(true); break;
            case 2: frequenceSaisie.setFebruary(true); break;
            case 3: frequenceSaisie.setMarch(true); break;
            case 4: frequenceSaisie.setApril(true); break;
            case 5: frequenceSaisie.setMay(true); break;
            case 6: frequenceSaisie.setJune(true); break;
            case 7: frequenceSaisie.setJuly(true); break;
            case 8: frequenceSaisie.setAugust(true); break;
            case 9: frequenceSaisie.setSeptember(true); break;
            case 10: frequenceSaisie.setOctober(true); break;
            case 11: frequenceSaisie.setNovember(true); break;
            case 12: frequenceSaisie.setDecember(true); break;
        }
    }
    
 // get filled count
    @GetMapping("filled/count")
    public ResponseEntity<Long> countFilledFiles() {
        long counts = fileService.countFilledFiles();
        return ResponseEntity.ok(counts);
    }
    
    //usetTypeCount
    @GetMapping("/count/{userType}")
    public Long getFileCountByUserType(@PathVariable String userType) {
        return fileService.getFileCountByUserType(userType);
    }
    
    
    // get all files
    @GetMapping("/filledFiles")
    public ResponseEntity<List<FilledFile>> getAllFilledFiles() {
        List<FilledFile> fileList = filledFileRepository.findAll();
        return ResponseEntity.ok(fileList);
    }
    
 // download files
    @GetMapping("filled/download/{id}")
    public ResponseEntity<InputStreamResource> downloadFilledFile(@PathVariable Long id) {
        FilledFile fileEntity = filledFileRepository.findById(id).orElse(null);
        if (fileEntity == null || fileEntity.getDisplayPicture() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(fileEntity.getDisplayPicture());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(fileEntity.getMimeType()));
        headers.setContentDispositionFormData("attachment", fileEntity.getFilename());

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentLength(fileEntity.getDisplayPicture().length)
                .body(new InputStreamResource(byteArrayInputStream));
    }
}
