import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  title?: string;
  buttonText?: string;
  onButtonPress?: () => void;
}

const ReusableModal: React.FC<Props> = ({
  visible,
  onClose,
  title = "Payment Successful",
  buttonText = "Go To Tracker",
  onButtonPress,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          {/* Close Button */}
          <Pressable onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>×</Text>
          </Pressable>

          {/* Icon (Green Tick) */}
          <View style={styles.circle}>
            <Text style={styles.checkmark}>✔</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* Button */}
          <Pressable style={styles.button} onPress={onButtonPress}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "75%",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
  closeText: {
    fontSize: 26,
    fontWeight: "500",
  },
  circle: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#2ecc71",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  checkmark: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 18,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1e90ff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "85%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ReusableModal;
