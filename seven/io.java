import java.io.*;
import java.nio.file.*;
import java.util.zip.*;

public class StreamExamples {

    public static void main(String[] args) {
        String inputFile = "input.txt";
        String outputFile = "output.txt";
        String data = "Hello, Java Streams!\nThis is a demonstration.";

        // 1. Basic File I/O
        writeToFile(outputFile, data);
        readFromFile(outputFile);

        // 2. Byte Streams
        byteStreamExample(inputFile, outputFile);

        // 3. Character Streams
        charStreamExample(inputFile, outputFile);

        // 4. Buffered Streams
        bufferedStreamExample(inputFile, outputFile);

        // 5. Data Streams (primitive data types)
        dataStreamExample();

        // 6. Object Serialization
        objectStreamExample();

        // 7. ZIP Compression
        zipStreamExample(inputFile, "compressed.zip");
    }

    // 1. Basic File I/O with try-with-resources
    private static void writeToFile(String filename, String content) {
        try (FileWriter writer = new FileWriter(filename)) {
            writer.write(content);
            System.out.println("Successfully wrote to file: " + filename);
        } catch (IOException e) {
            System.err.println("Error writing to file: " + e.getMessage());
        }
    }

    private static void readFromFile(String filename) {
        try (FileReader reader = new FileReader(filename)) {
            int character;
            System.out.println("\nReading from file " + filename + ":");
            while ((character = reader.read()) != -1) {
                System.out.print((char) character);
            }
            System.out.println();
        } catch (IOException e) {
            System.err.println("Error reading from file: " + e.getMessage());
        }
    }

    // 2. Byte Stream Example (FileInputStream/FileOutputStream)
    private static void byteStreamExample(String input, String output) {
        try (FileInputStream in = new FileInputStream(input);
             FileOutputStream out = new FileOutputStream(output + ".bytecopy")) {
            
            byte[] buffer = new byte[1024];
            int bytesRead;
            
            while ((bytesRead = in.read(buffer)) != -1) {
                out.write(buffer, 0, bytesRead);
            }
            System.out.println("\nByte stream copy completed");
        } catch (IOException e) {
            System.err.println("Byte stream error: " + e.getMessage());
        }
    }

    // 3. Character Stream Example (FileReader/FileWriter)
    private static void charStreamExample(String input, String output) {
        try (FileReader reader = new FileReader(input);
             FileWriter writer = new FileWriter(output + ".charcopy")) {
            
            char[] buffer = new char[1024];
            int charsRead;
            
            while ((charsRead = reader.read(buffer)) != -1) {
                writer.write(buffer, 0, charsRead);
            }
            System.out.println("Character stream copy completed");
        } catch (IOException e) {
            System.err.println("Character stream error: " + e.getMessage());
        }
    }

    // 4. Buffered Stream Example (more efficient)
    private static void bufferedStreamExample(String input, String output) {
        try (BufferedReader reader = new BufferedReader(new FileReader(input));
             BufferedWriter writer = new BufferedWriter(new FileWriter(output + ".bufferedcopy"))) {
            
            String line;
            while ((line = reader.readLine()) != null) {
                writer.write(line);
                writer.newLine(); // platform-independent line ending
            }
            System.out.println("Buffered stream copy completed");
        } catch (IOException e) {
            System.err.println("Buffered stream error: " + e.getMessage());
        }
    }

    // 5. Data Streams for primitive types
    private static void dataStreamExample() {
        try (DataOutputStream out = new DataOutputStream(new FileOutputStream("data.bin"));
             DataInputStream in = new DataInputStream(new FileInputStream("data.bin"))) {
            
            // Write primitives
            out.writeInt(42);
            out.writeDouble(3.14159);
            out.writeBoolean(true);
            out.writeUTF("Java Data Stream");
            
            // Read back in same order
            System.out.println("\nData stream values:");
            System.out.println("Int: " + in.readInt());
            System.out.println("Double: " + in.readDouble());
            System.out.println("Boolean: " + in.readBoolean());
            System.out.println("String: " + in.readUTF());
            
        } catch (IOException e) {
            System.err.println("Data stream error: " + e.getMessage());
        }
    }

    // 6. Object Serialization
    private static void objectStreamExample() {
        class Person implements Serializable {
            private static final long serialVersionUID = 1L;
            String name;
            int age;
            
            Person(String name, int age) {
                this.name = name;
                this.age = age;
            }
            
            @Override
            public String toString() {
                return name + " (" + age + ")";
            }
        }

        try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("person.ser"));
             ObjectInputStream in = new ObjectInputStream(new FileInputStream("person.ser"))) {
            
            // Write object
            Person person = new Person("Alice", 30);
            out.writeObject(person);
            
            // Read object
            Person deserialized = (Person) in.readObject();
            System.out.println("\nDeserialized Person: " + deserialized);
            
        } catch (IOException | ClassNotFoundException e) {
            System.err.println("Object stream error: " + e.getMessage());
        }
    }

    // 7. ZIP Compression Example
    private static void zipStreamExample(String input, String zipFile) {
        try (ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(zipFile));
             FileInputStream fis = new FileInputStream(input)) {
            
            // Create a zip entry
            ZipEntry zipEntry = new ZipEntry(input);
            zos.putNextEntry(zipEntry);
            
            // Write file to zip
            byte[] buffer = new byte[1024];
            int len;
            while ((len = fis.read(buffer)) > 0) {
                zos.write(buffer, 0, len);
            }
            zos.closeEntry();
            
            System.out.println("\nFile successfully compressed to: " + zipFile);
        } catch (IOException e) {
            System.err.println("ZIP stream error: " + e.getMessage());
        }
    }
}