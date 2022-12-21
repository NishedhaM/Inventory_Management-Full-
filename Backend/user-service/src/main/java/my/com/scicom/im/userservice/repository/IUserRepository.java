package my.com.scicom.im.userservice.repository;


import my.com.scicom.im.userservice.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserRepository extends JpaRepository <UserModel,Integer> {
    UserModel findByName(String name);
}
