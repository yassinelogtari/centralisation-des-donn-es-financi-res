package com.upload.app.entity;

import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "files")
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long ref;
    
    private String name;
    private String details;
    
    @Column(unique = true)
    private String filename;

    @Lob
    @Column(length = 1000000)
    private byte[] displayPicture;
    
    private String mimeType;

    @Embedded
    private FrequenceSaisie frequenceSaisie;

    @Column(name = "user_type")
    private String userType;

    public void setUserType(Set<UserType> userTypes) {
        this.userType = userTypes.stream()
                                  .map(UserType::name)
                                  .collect(Collectors.joining(","));
    }

    public Set<UserType> getUserTypes() {
        return Stream.of(this.userType.split(","))
                     .map(UserType::valueOf)
                     .collect(Collectors.toSet());
    }
}
