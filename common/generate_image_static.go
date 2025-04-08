package common

import (
	"fmt"
	"mime/multipart"
)

func RenameFile(file *multipart.FileHeader, id string) string {
	filename := fmt.Sprintf("tour_%s_%s", id, file.Filename)
	filePath := fmt.Sprintf("./uploads/tours/%s", filename)
	return filePath
}
