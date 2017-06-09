class User {
  constructor(id, name, email, password_digest, created_at, updated_at) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password_digest = password_digest;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  authenticate(password) {
    return (password == this.password_digest);
  }
}

module.exports = User;
