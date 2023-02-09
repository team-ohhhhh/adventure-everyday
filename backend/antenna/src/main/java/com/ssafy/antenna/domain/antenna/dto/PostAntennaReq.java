package com.ssafy.antenna.domain.antenna.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Size;

public record PostAntennaReq(
        @Max(value =20, message = "AREA_SIZE_ERROR")
        Long area,
        double lng,
        double lat
) {
}
