package common

type ChangePassword struct {
	OldPassword string `json:"old_password"`
	NewPassword string `json:"new_password"`
}

// Swagger модели

// ResultWithErrors - ответ
type ResultWithErrors struct {
	Result string `json:"result"`
	Error  string `json:"error"`
}

// ErrorOnly - ответ с выводом только ошибок
type ErrorOnly struct {
	Error string `json:"error"`
}
