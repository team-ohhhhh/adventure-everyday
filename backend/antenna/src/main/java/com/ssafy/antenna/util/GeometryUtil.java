package com.ssafy.antenna.util;

import com.ssafy.antenna.domain.location.Location;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.io.ParseException;
import org.locationtech.jts.io.WKTReader;

public class GeometryUtil {
    public static Location calculateByDirection(Double baseLongitude, Double baseLatitude, double distance,
                                                Double bearing) {

        Double radianLatitude = toRadian(baseLongitude);
        Double radianLongitude = toRadian(baseLatitude);
        Double radianAngle = toRadian(bearing);
        Double distanceRadius = distance / 6371.01;

        Double latitude = Math.asin(sin(radianLatitude) * cos(distanceRadius) +
                cos(radianLatitude) * sin(distanceRadius) * cos(radianAngle));
        Double longitude = radianLongitude + Math.atan2(sin(radianAngle) * sin(distanceRadius) * cos(radianLatitude),
                cos(distanceRadius) - sin(radianLatitude) * sin(latitude));

        longitude = (longitude + 540) % 360 - 180;

        return new Location(toDegree(longitude), toDegree(latitude));
    }

    private static Double toRadian(Double coordinate) {
        return coordinate * Math.PI / 180.0;
    }

    private static Double toDegree(Double coordinate) {
        return coordinate * 180.0 / Math.PI;
    }

    private static Double sin(Double coordinate) {
        return Math.sin(coordinate);
    }

    private static Double cos(Double coordinate) {
        return Math.cos(coordinate);
    }

    public static Point getEmptyPoint() throws ParseException {
        Double latitude = 0.0;
        Double longitude = 0.0;
        String pointWKT = String.format("POINT(%s %s)", longitude, latitude);
        return (Point) new WKTReader().read(pointWKT);
    }
}
