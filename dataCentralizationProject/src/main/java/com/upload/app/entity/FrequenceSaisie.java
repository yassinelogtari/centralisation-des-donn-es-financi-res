package com.upload.app.entity;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter
@Setter
public class FrequenceSaisie {
    private boolean january = false;
    private boolean february = false;
    private boolean march = false;
    private boolean april = false;
    private boolean may = false;
    private boolean june = false;
    private boolean july = false;
    private boolean august = false;
    private boolean september = false;
    private boolean october = false;
    private boolean november = false;
    private boolean december = false;
}
