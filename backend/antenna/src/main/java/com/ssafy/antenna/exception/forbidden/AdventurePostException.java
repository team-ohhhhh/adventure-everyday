package com.ssafy.antenna.exception.forbidden;

import com.ssafy.antenna.exception.AbstractAppException;
import com.ssafy.antenna.exception.ErrorCode;

public class AdventurePostException extends AbstractAppException {
	public AdventurePostException() {
		super(ErrorCode.ADVENTURE_POST);
	}
}
