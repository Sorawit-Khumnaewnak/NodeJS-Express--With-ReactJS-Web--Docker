mongo -- "$MONGODB_DBNAME" <<EOF
    // Setup Username & Password and DB
    var rootUser = '$MONGO_INITDB_ROOT_USERNAME';
    var rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
    var admin = db.getSiblingDB('admin');
    admin.auth(rootUser, rootPassword);
    var user = '$MONGODB_USERNAME';
    var passwd = '$MONGODB_PASSWORD';

    db.createUser({
        user: user,
        pwd: passwd,
        roles: ["readWrite"]
    });

    // Init-User
    var initData = cat('/docker-entrypoint-initdb.d/init-user.js');
    var jsonData = JSON.parse(initData);
    var accountUserColl = db.getSiblingDB('$MONGODB_DBNAME').account_users;
    jsonData.forEach(function(userObj) {
        userObj.createdAt = new Date(userObj.createdAt);
        userObj.updatedAt = new Date(userObj.updatedAt);
        accountUserColl.insert(userObj);
    });
EOF