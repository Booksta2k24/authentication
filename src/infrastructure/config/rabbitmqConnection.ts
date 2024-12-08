import amqp, { Connection } from 'amqplib';

let connection: Connection | null = null;

export const getRabbitMQConnection = async (): Promise<Connection> => {
    if (!connection) {
        connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
        console.log('RabbitMQ connection established');
    }
    return connection;
};

export const closeRabbitMQConnection = async (): Promise<void> => {
    if (connection) {
        await connection.close();
        connection = null;
        console.log('RabbitMQ connection closed');
    }
};
