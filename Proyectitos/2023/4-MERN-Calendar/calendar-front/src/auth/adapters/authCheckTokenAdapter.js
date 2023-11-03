export const authCheckTokenAdapter = data => ({
	ok: data.ok,
	msg: data.msg,
	uid: data.uid,
	name: data.name,
	token: data.token,
});