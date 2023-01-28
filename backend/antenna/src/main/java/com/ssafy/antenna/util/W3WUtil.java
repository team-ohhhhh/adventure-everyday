package com.ssafy.antenna.util;

import com.what3words.javawrapper.What3WordsV3;
import com.what3words.javawrapper.request.Coordinates;
import com.what3words.javawrapper.response.ConvertTo3WA;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class W3WUtil {
    @Value("${w3w.token.secret}")
    private static String SECRET_KEY;

    public static ConvertTo3WA getW3W(double lat, double lng){
        System.out.println(lat + " " + lng);
        System.out.println("9JQT4MJK");
        What3WordsV3 api = new What3WordsV3("9JQT4MJK");
        ConvertTo3WA words = api.convertTo3wa(new Coordinates(lng, lat))
                .language("ko")
                .execute();
        System.out.println(words);
        System.out.println("w3w 유틸 끝");
        return words;
    }
}
