package my.com.scicom.im.message.model;

import my.com.scicom.im.message.config.MessagingConfig;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class MessageModel {

    @RabbitListener(queues = MessagingConfig.QUEUE)
    public void consumeMessageFromQueue(my.com.scicom.im.userservice.model.UserStatus messageStatus){
        System.out.println("Message received from queue:"+messageStatus.toString());
    }
}
