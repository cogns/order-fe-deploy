<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="2" md="4">
                <v-card>
                    <v-card-title class="text-h5 text-center">
                        로그인
                    </v-card-title><br>

                    <v-card-text>
                        <v-form @submit.prevent="doLogin">
                            <v-text-field label="email" v-model="email" prepend-icon="mdi-email" type="email" required>
                            </v-text-field>

                            <v-text-field label="비밀번호" v-model="password" prepend-icon="mdi-lock" type="password"
                                required>
                            </v-text-field>

                            <v-row>
                                <v-col cols="6">
                                    <v-btn color="blue" @click="showPasswordModal" block>비밀번호 변경</v-btn>
                                </v-col>
                                <v-col cols="6">
                                    <v-btn type="submit" color="primary" block>로그인</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <!-- resetPassword가 true가 될 때 해당 모달창이 보여짐 -->
        <!-- @update:dialog는 modal컴포넌트가 update:dialog라는 이벤트를 발생시킬 떄 시행될 이벤트 핸들러를 정의 -->
        <!-- $event는 자식요소로부터 전달된 값. true/false가 모달로부터 전달 -->
        <ResetPasswordModal
        v-model="resetPassword"
        @update:dialog="resetPassword = $event"
        >

        </ResetPasswordModal>
    </v-container>
</template>

<script>
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import ResetPasswordModal from './ResetPasswordModal.vue';
export default {
    components:{
        ResetPasswordModal
    },
    data() {
        return {
            email: "",
            password: "",
            resetPassword:false
        }
    },
    methods: {
        async doLogin() {
            try {
                const loginData = {
                    email: this.email,
                    password: this.password
                }
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/doLogin`, loginData);
                // localstorage라는 브라우저의 특정 공간에 서버로부터 받아온 토큰값 저장
                const token = response.data.result.token;
                const refreshToken = response.data.result.refreshToken;
                const role = jwtDecode(token).role;
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('role', role);
                // this.$router.push("/");

                // Sse를 위한 연결 코드
                

                window.location.href='/';
            } catch (e) {
                const error_message = e.response.data.error_message
                console.log(error_message)
                alert(error_message)
            }
        },

        showPasswordModal(){
            this.resetPassword = true;
        }
    }
}
</script>