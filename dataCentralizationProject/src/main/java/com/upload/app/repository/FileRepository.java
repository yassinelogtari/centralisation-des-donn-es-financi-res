package com.upload.app.repository; 

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.upload.app.dto.FileProjection;
import com.upload.app.entity.File;

public interface FileRepository extends JpaRepository<File, Long> {

    @Query("SELECT f FROM File f WHERE f.userType LIKE %:userType%")
    List<File> findByUserType(String userType);

    @Query("SELECT f.ref as ref, f.name as name, f.details as details, f.filename as filename, f.mimeType as mimeType, " +
           "f.frequenceSaisie.january as january, f.frequenceSaisie.february as february, f.frequenceSaisie.march as march, " +
           "f.frequenceSaisie.april as april, f.frequenceSaisie.may as may, f.frequenceSaisie.june as june, " +
           "f.frequenceSaisie.july as july, f.frequenceSaisie.august as august, f.frequenceSaisie.september as september, " +
           "f.frequenceSaisie.october as october, f.frequenceSaisie.november as november, f.frequenceSaisie.december as december " +
           "FROM File f WHERE f.userType LIKE %:userType%")
    List<FileProjection> findFileProjectionsByUserType(String userType);
    
    
    @Query("SELECT COUNT(f) FROM File f WHERE f.userType = :userType")
    Long countFilesByUserType(String userType);
    
    File findByFilename(String filename);
}
