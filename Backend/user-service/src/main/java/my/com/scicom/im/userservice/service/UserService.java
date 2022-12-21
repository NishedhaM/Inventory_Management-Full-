package my.com.scicom.im.userservice.service;


import my.com.scicom.im.userservice.model.UserModel;
import my.com.scicom.im.userservice.repository.IUserRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.BiConsumer;

@Service
public class UserService  {


    @Autowired
    private IUserRepository userRepo;


    private PasswordEncoder passwordEncoder;
   // private PasswordEncoder passwordEncoder2;


    public UserModel saveUser(UserModel user){
        System.out.println(user.getPassword());
        this.passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword=this.passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        System.out.println(encodedPassword);
//        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
//        user.setPassword(encodedPassword);
       // JdbcUserDetailsManager.DEF_CREATE_USER_SQL(user);
        return userRepo.save(user);
    }

    public List<UserModel> saveUserList(List<UserModel> user){
        return userRepo.saveAll(user);
    }

    public List<UserModel> getUserList(){
        return userRepo.findAll();
    }

    public UserModel getUserById(int id){
        return userRepo.findById(id).orElse(null);
    }

    public UserModel getUserByName(String username){
        return userRepo.findByName(username);
    }

    public String deleteUser(int id){
        userRepo.deleteById(id);
        return "User("+id+") is deleted Successfully" ;
    }

    public UserModel updateUser(int id,UserModel user){
        this.passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword=this.passwordEncoder.encode(user.getPassword());
        UserModel existingUser = userRepo.findById(id).orElseThrow();
        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(encodedPassword);
        final UserModel updatedEmployee = userRepo.save(existingUser);
        return updatedEmployee;
    }

    public String Login(String UserName, String Password) {

        UserModel trueUser = userRepo.findByName(UserName);
        String truePassword = trueUser.getPassword();
        System.out.println(trueUser.getPassword());


        if (trueUser != null) {

            if (Password.equals(truePassword)) {
                return "Login success";
            } else {
                return "Password is incorrect";
            }
        } else {
            return "Username is incorrect";
        }

    }

    public ResponseEntity<?> userLogin(UserModel user){
        UserModel trueUser=userRepo.findByName(user.getName());

       //String Password=user.getPassword();
       // System.out.println(Password);

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if (trueUser != null) {

            if (passwordEncoder.matches(user.getPassword(),trueUser.getPassword())) {
               // return ;
                return ResponseEntity.ok(user);

            } else {
                return new ResponseEntity<>("Password Incorrect", HttpStatus.NOT_FOUND);

            }
        }
        else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);

        }

    }

    public UserModel updatePatiallyUser(int id, Map<Object, Object> objectMap) {
        UserModel userModel = getUserById(id);
        objectMap.forEach((key, value) -> {
            Field field=ReflectionUtils.findField(UserModel.class,(String) key);
            field.setAccessible(true);
            ReflectionUtils.setField(field,userModel,value);
        });
        return userRepo.save(userModel);
    }
}
