router.post('/login', async(req, res) => {
  if (!req.body.username || !req.body.password) return res.status(400).send("Invalid username or password");
    let loginquery='SELECT status,name ,role_id,email,mobile FROM t_portal_users  WHERE email = ? and password=md5(?) and status=? ';
    let response=await runQuery(loginquery,[req.body.username, req.body.password,'Active','']);
    console.log(response)
    if(response) {
      if(response[0]){
        let payload={
          username:response.username,
          email:response.email,
          type:response.role_id,
          // org_category:response.org_category
        }
        let token = jwt.sign(payload, jwssecret);
        if(response.length==1){
          req.session.user = response[0].email;
          req.session.role = response[0].role_id;
          // req.session.org_id = response[0].org_id;
          req.session.save();
        } 
        res.json({
          success: true,
          message: 'Login success',
          token: token,
          RawData:response,
          orgcount:response.length
        });
      }else{
        res.json({
          success: false,
          message: 'Invalid credentials',
          token: "",
          RawData:response
        });
      }
    }
  })