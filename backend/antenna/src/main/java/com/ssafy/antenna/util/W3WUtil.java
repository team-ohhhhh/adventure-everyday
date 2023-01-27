package com.ssafy.antenna.util;

import com.what3words.javawrapper.What3WordsV3;
import com.what3words.javawrapper.request.Coordinates;
import com.what3words.javawrapper.response.ConvertTo3WA;
import org.springframework.beans.factory.annotation.Value;

public class W3WUtil {
    @Value("${w3w.token.secret}")
    private static String SECRET_KEY;
    public static ConvertTo3WA getW3W(double lng, double lat){
        What3WordsV3 api = new What3WordsV3(SECRET_KEY);
        ConvertTo3WA words = api.convertTo3wa(new Coordinates(lat, lng))
                .language("ko")
                .execute();
        return words;
    }
}
