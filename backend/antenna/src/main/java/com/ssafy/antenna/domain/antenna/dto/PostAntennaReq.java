package com.ssafy.antenna.domain.antenna.dto;

import jakarta.validation.constraints.Size;

public record PostAntennaReq(
        @Size(max=20, message = "AREA_SIZE_ERROR")
        int area,
        double lng,
        double lat) {
}
