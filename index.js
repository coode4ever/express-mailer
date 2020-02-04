const app = require("express")(),
  mailer = require("express-mailer");

mailer.extend(app, {
  from: "no-reply@example.com",
  host: "smtp.gmail.com", // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: "SMTP", // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: "gmail.user@gmail.com",
    pass: "userpass"
  }
});

const mailOptions = {
  to: "example@gmail.com", // REQUIRED. This can be a comma delimited string just like a normal email to field.
  subject: "Test Email", // REQUIRED.
  otherProperty: "Other Property", // All additional properties are also passed to the template as local variables.
  user: {
    name: "John",
    email: "example@gmail.com"
  }
};

app.get("/", function(req, res, next) {
  app.mailer.send("email", mailOptions, function(err) {
    if (err) {
      // handle error
      console.log(err);
      res.send("There was an error sending the email");
      return;
    }
    res.send("Email Sent");
  });
});

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

const port = 5000;

app.listen(port, () => {
  console.log("Server is listening on port", port);
});
