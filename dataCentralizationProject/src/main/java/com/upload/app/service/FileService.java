package com.upload.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.upload.app.dto.FileProjection;
import com.upload.app.entity.File;
import com.upload.app.repository.FileRepository;
import com.upload.app.repository.FilledFileRepository;

@Service
public class FileService {

    @Autowired
    private FileRepository fileRepository;
    
    @Autowired
    private FilledFileRepository filledFileRepository;

    public long countFiles() {
        return fileRepository.count();
    }
    
    public long countFilledFiles() {
        return filledFileRepository.count();
    }
    
    
    
    public List<File> getFilesByUserType(String userType) {
        return fileRepository.findByUserType(userType);
    }
    
    public List<FileProjection> getFileProjectionsByUserType(String userType) {
        return fileRepository.findFileProjectionsByUserType(userType);
    }
    

    public Long getFileCountByUserType(String userType) {
        return fileRepository.countFilesByUserType(userType);
    }
}
