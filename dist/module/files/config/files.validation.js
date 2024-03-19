"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.default = new common_1.ParseFilePipeBuilder()
    .addFileTypeValidator({
    fileType: /^(video\/mp4|video\/webm|image\/jpeg|image\/png|text\/plain)$/,
})
    .addMaxSizeValidator({
    maxSize: 1024 * 1024 * 30,
})
    .build({
    errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
});
//# sourceMappingURL=files.validation.js.map