package com.upload.app.dto;

import com.upload.app.entity.UserType;

public interface FileProjection {

    Long getRef();
    String getName();
    String getDetails();
    String getFilename();
    String getMimeType();
    UserType getUserType();

    boolean isJanuary();
    boolean isFebruary();
    boolean isMarch();
    boolean isApril();
    boolean isMay();
    boolean isJune();
    boolean isJuly();
    boolean isAugust();
    boolean isSeptember();
    boolean isOctober();
    boolean isNovember();
    boolean isDecember();
}
