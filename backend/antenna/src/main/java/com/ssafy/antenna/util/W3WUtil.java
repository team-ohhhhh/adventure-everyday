package com.ssafy.antenna.util;

import com.what3words.javawrapper.What3WordsV3;
import com.what3words.javawrapper.request.Coordinates;
import com.what3words.javawrapper.response.ConvertTo3WA;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class W3WUtil {
    @Value("${w3w.token.secret}")
    private String SECRET_KEY;

    public ConvertTo3WA getW3W(double lat, double lng){
        What3WordsV3 api = new What3WordsV3(SECRET_KEY);
        ConvertTo3WA words = api.convertTo3wa(new Coordinates(lng, lat))
                .language("ko")
                .execute();
        return words;
    }
}
