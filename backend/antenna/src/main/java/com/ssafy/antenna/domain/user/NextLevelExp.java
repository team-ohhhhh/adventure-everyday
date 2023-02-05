package com.ssafy.antenna.domain.user;

public enum NextLevelExp {
    ONE(1000),
    TWO(3000),
    THREE(5000),
    FOUR(10000),
    FIVE(50000);

    private final int value;
    NextLevelExp(int value) { this.value = value; }
    public int value() { return value; }
}
