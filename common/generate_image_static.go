package common

import (
	"fmt"
	"mime/multipart"
)

func RenameFile(file *multipart.FileHeader, tourName string) string {
	filename := fmt.Sprintf("tour_%s_%s", tourName, file.Filename)
	filePath := fmt.Sprintf("./uploads/tours/%s", filename)
	return filePath
}
