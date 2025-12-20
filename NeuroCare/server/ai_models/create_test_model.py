import tensorflow as tf
import numpy as np

# Create a simple test model for stroke prediction
def create_test_model():
    inputs = tf.keras.Input(shape=(10,))
    x = tf.keras.layers.Dense(64, activation='relu')(inputs)
    x = tf.keras.layers.Dense(32, activation='relu')(x)
    outputs = tf.keras.layers.Dense(1, activation='sigmoid')(x)
    
    model = tf.keras.Model(inputs=inputs, outputs=outputs)
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    
    # Create some sample training data
    np.random.seed(42)
    X_train = np.random.rand(1000, 10)
    y_train = np.random.randint(2, size=1000)
    
    # Train the model
    model.fit(X_train, y_train, epochs=5, batch_size=32, verbose=1)
    
    # Save the model
    save_path = "stroke_model.keras"
    model.save(save_path)
    print(f"Model saved to {save_path}")

if __name__ == "__main__":
    print("Creating and training test model...")
    create_test_model()