// Create admin user
dbAdmin = db.getSiblingDB("admin");
dbAdmin.createUser({
  user: "admin",
  pwd: "password",
  roles: [{ role: "userAdminAnyDatabase", db: "admin" }],
});

// Authenticate user
dbAdmin.auth({
  user: "admin",
  pwd: "password",
});
