package com.upload.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.upload.app.entity.FilledFile;

@Repository
public interface FilledFileRepository extends JpaRepository<FilledFile, Long> {
	FilledFile findByFilename(String filename);
	FilledFile findByFilenameAndUserType(String filename, String userType);
}
