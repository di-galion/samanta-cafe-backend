import {ConfigService} from "@nestjs/config";

export const getJwtConfig = (configService: ConfigService) => {
    return {secret: configService.get("SECRET_KEY")}
}