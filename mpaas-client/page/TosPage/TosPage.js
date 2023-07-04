Page({
  data: {
    agreeDisabled: true,
    reachedBottom: false,
    checkbox: false,
    termsOfService: [
      {
        section: "Terms of Service:",
        content: "Welcome to our application. By accessing and using this application, you agree to comply with and be bound by the following terms and conditions:"
      },
      {
        section: "1. Intellectual Property:",
        content: "All content in this application, including text, graphics, logos, button icons, images, audio clips, and software, is the property of the application owner and is protected by international copyright laws."
      },
      {
        section: "2. Use of the Application:",
        content: "You may use this application for personal, non-commercial purposes only. You are prohibited from modifying, copying, distributing, transmitting, displaying, performing, reproducing, publishing, licensing, creating derivative works from, transferring, or selling any information, software, products, or services obtained from this application."
      },
      {
        section: "3. User Conduct:",
        content: "When using this application, you agree not to:\n- Violate any applicable laws or regulations.\n- Impersonate any person or entity.\n- Interfere with or disrupt the operation of the application.\n- Engage in any fraudulent or illegal activities."
      },
      {
        section: "4. Disclaimer of Warranties:",
        content: "This application is provided 'as is' without any representations or warranties, express or implied. The application owner disclaims all warranties regarding the operation of the application, including but not limited to the accuracy, reliability, or completeness of any content."
      },
      {
        section: "5. Limitation of Liability:",
        content: "The application owner shall not be liable for any damages arising out of the use or inability to use this application, including but not limited to direct, indirect, incidental, special, or consequential damages."
      },
      {
        section: "6. Governing Law:",
        content: "These terms and conditions shall be governed by and construed in accordance with the laws of [your country or jurisdiction]. Any disputes arising under or in connection with these terms and conditions shall be subject to the exclusive jurisdiction of the courts in [your country or jurisdiction]."
      },
      {
        section: "",
        content: "By using this application, you acknowledge that you have read, understood, and agreed to these terms and conditions. If you do not agree to these terms and conditions, please do not use this application."
      }
    ],
  },

  checkChange(){
    if(!this.data.checkbox){
      this.setData({
        checkbox: true
      })
    }else{
      this.setData({
        checkbox: false
      })
    }
  },

  acceptTos(){
    my.setStorageSync({key: "tosAccept", data: true})
    my.reLaunch({'url': '/page/LoginPage/LoginPage'})
  }
})
