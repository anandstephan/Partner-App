import React, { use, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import Logo from "../../assets/jsx/Logo";
import Colors from "../../constants/color";
import Fonts from "../../constants/font";
import { useLogin } from "../../features/login/useLogin";
import { useDispatch } from "react-redux";
import { toggleLoggedIn } from "../../store/slices/authSlice";
import Storage from "../../utilites/storage";
import { RenderDropdown } from "../../utilites/renderDropdown";

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

const Login = () => {
  const dispatch = useDispatch()

      const { mutate } = useLogin();
  // 🔹 UI States
  const [activeTab, setActiveTab] = useState<"employee" | "partner">("employee");
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 🔹 Form Submission Handler
  const handleLogin = async () => {
    if (!employeeId.trim() || !password.trim()) {
      Alert.alert("Missing Fields", "Please fill in all fields before logging in.");
      return;
    }

    try {
      setIsLoading(true);

        mutate(
                  {
                    mobile: "9876543211",  // expected 10-digit Indian mobile
                    password: "9876543211",  // plain text here; send over HTTPS only
                    type: "user"
                  },
                  {
                    onSuccess: (res) => {
                      dispatch(toggleLoggedIn())
                      // console.log("Login Res",res)
                      Storage.setItem("token",res?.token) 
                      Storage.setItem("id",res?.id)
                    },
                    onError: (err) => {
                      Alert.alert("Error",err.message)
                      console.log("Error",err)
                    }
                  }
                );
      Alert.alert("Success", `Logged in as ${activeTab.toUpperCase()}!`);
      // You can navigate from here → navigation.navigate("Dashboard")
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 OTP Login
  const handleOtpLogin = () => {
    Alert.alert("OTP Login", "Redirecting to OTP login flow...");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.appBackground }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.upperContainer}>
            <Logo />
            <Text style={styles.loginText}>
              Login as a{" "}
              <Text style={{ color: Colors.secondary, fontFamily: Fonts.INTER_SEMI_BOLD }}>
                {activeTab === "employee" ? "Employee" : "Partner"}
              </Text>{" "}
              today
            </Text>
          </View>

          {/* Toggle Buttons */}
          <View style={styles.toggleContainer}>
            <Pressable
              onPress={() => setActiveTab("employee")}
              style={[
                styles.toggleButton,
                activeTab === "employee" ? styles.activeBtn : styles.inactiveBtn,
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  { color: activeTab === "employee" ? "#fff" : "#000" },
                ]}
              >
                Employee Login
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setActiveTab("partner")}
              style={[
                styles.toggleButton,
                activeTab === "partner" ? styles.activeBtn : styles.inactiveBtn,
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  { color: activeTab === "partner" ? "#fff" : "#000" },
                ]}
              >
                Partner Login
              </Text>
            </Pressable>
          </View>

          <RenderDropdown
  
            field="leadSource"
            placeholder="Select the Source of lead"
            options={data}
            currentValue={""}
            onSelect={()=>{}}
          />

          {/* Form */}
          <View style={styles.formContainer}>
            <Text style={styles.label}>
              {activeTab === "employee" ? "Employee ID" : "Partner ID"}
            </Text>
            <TextInput
              style={styles.input}
              value={employeeId}
              onChangeText={setEmployeeId}
              placeholder={
                activeTab === "employee" ? "Enter your Employee ID" : "Enter your Partner ID"
              }
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              placeholderTextColor="#999"
            />

            <View style={styles.bottomRow}>
              <Pressable onPress={handleOtpLogin} style={styles.otpBtn}>
                <Text style={styles.otpText}>Login with OTP</Text>
              </Pressable>

              <Pressable
                onPress={handleLogin}
                style={[styles.loginBtn, isLoading && { opacity: 0.6 }]}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.loginBtnText}>Login Now</Text>
                )}
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    paddingBottom: 40,
    backgroundColor: Colors.appBackground,
  },
  upperContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: {
    fontFamily: Fonts.INTER_MEDIUM,
    fontSize: 14,
    marginTop: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  toggleButton: {
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginHorizontal: 5,
  },
  activeBtn: {
    backgroundColor: Colors.secondary,
    elevation: 3,
  },
  inactiveBtn: {
    backgroundColor: "#EAEAEA",
  },
  toggleText: {
    fontFamily: Fonts.INTER_MEDIUM,
  },
  formContainer: {
    width: Dimensions.get("window").width / 1.2,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  label: {
    fontFamily: Fonts.INTER_SEMI_BOLD,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#F7F7F7",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  otpBtn: {
    backgroundColor: "transparent",
  },
  otpText: {
    fontFamily: Fonts.INTER_MEDIUM,
    color: "#000",
  },
  loginBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  loginBtnText: {
    color: "#fff",
    fontFamily: Fonts.INTER_SEMI_BOLD,
  },
});
