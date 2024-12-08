import { IUser } from "../../../domain/user";
import { getRabbitMQConnection } from "../../config/rabbitmqConnection";

const publishUserConnection = async (user: IUser): Promise<boolean> => {
    try {
        const queue = 'user_data_queue';
        const connection = await getRabbitMQConnection();
        // Use confirm channel for reliability
        const channel = await connection.createConfirmChannel(); 

        await channel.assertQueue(queue, { durable: true });

        // Send message and ensure it reaches the queue
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(user)));
        // Confirms ensure the broker received the message
        await channel.waitForConfirms(); 

        console.log('Message sent successfully:', user);
        return true;
    } catch (error) {
        console.error('Error in publishing message:', error);
        return false; 
    }
};

export { publishUserConnection };
