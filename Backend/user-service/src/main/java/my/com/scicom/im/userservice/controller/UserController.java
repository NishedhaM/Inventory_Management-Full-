package my.com.scicom.im.userservice.controller;

import my.com.scicom.im.userservice.config.MessagingConfig;
import my.com.scicom.im.userservice.model.UserModel;
import my.com.scicom.im.userservice.model.UserStatus;
import my.com.scicom.im.userservice.service.UserService;
import org.hibernate.cfg.NotYetImplementedException;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("users")
//@ComponentScan(basePackages = {"my.com.sci-com.im.user service.controller"})
public class UserController
{
    @Autowired
    private UserService userServ;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    //save one user (registration)
    @PostMapping("")
    public UserModel addUser(@RequestBody UserModel user){

        UserStatus userStatus=new UserStatus(user,"PROCESS","User Registered Successfully!");
        rabbitTemplate.convertAndSend(MessagingConfig.EXCHANGE,MessagingConfig.ROUTING_KEY,userStatus);
        return userServ.saveUser(user);
    }

    //save user list
    @PostMapping("/list")
    public List<UserModel> addUsers(@RequestBody List<UserModel> user){
        return userServ.saveUserList(user);
    }

    //getting all the user list
    @GetMapping("")
    public List<UserModel> findAllUsers(){
        return userServ.getUserList();
    }

    //getting user from the user id
    @GetMapping("/{id}")
    public UserModel findUserById(@PathVariable int id){
        return userServ.getUserById(id);
    }

    //getting user from the username
    @GetMapping("/username/{name}")
    public UserModel findUserByName(@PathVariable String name){
        return userServ.getUserByName(name);
    }

    //updating the user
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable int id,@RequestBody UserModel productModel){
        return new ResponseEntity<>(userServ.updateUser(id,productModel), HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public UserModel updateUserWithMap(@PathVariable("id") int id,@RequestBody Map<Object,Object>objectMap){
        return userServ.updatePatiallyUser(id,objectMap);
    }

    //delete the  (not updating the database)
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable int id){
        return userServ.deleteUser(id);
    }

    //Login
    @GetMapping("/Auth/{username}/{password}")
    public ResponseEntity<?> Login(@PathVariable("username") String username,@PathVariable("password") String password){
        return new ResponseEntity<>(userServ.Login(username,password), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserModel user){
        return new ResponseEntity<>(userServ.userLogin(user),HttpStatus.OK);
        }



}
