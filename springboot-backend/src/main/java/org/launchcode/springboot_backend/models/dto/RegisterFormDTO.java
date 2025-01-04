package org.launchcode.springboot_backend.models.dto;

public class RegisterFormDTO extends LoginFormDTO {

    private String verifyPassword;

    public String getVerifyPassword() {
        return verifyPassword;
    }

    public void setVerifyPassword(String verifyPassword) {
            this.verifyPassword = verifyPassword;
    }

}
