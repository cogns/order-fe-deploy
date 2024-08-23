<template>
    <v-container>
        <v-row justify="center">
            <!-- 화면 크기가 small이상(스마트폰, 태블릿)일때: sm -->
            <!-- 화면 크기가 medium 이상(데스크탑)일때: md -->
            <!-- sm: small screen, md: medium screen -->
            <v-col cols="12" sm="4" md="6">
                <v-card>
                    <v-card-title class="text-h5 text-center">
                        회원가입
                    </v-card-title><br><br>

                    <v-card-text>
                        <v-form @submit.prevent="memberCreate">
                            <v-text-field label="이름" v-model="name" prepend-icon="mdi-account" required>

                            </v-text-field>
                            <v-text-field label="email" v-model="email" prepend-icon="mdi-email" type="email" required>

                            </v-text-field>
                            <v-text-field label="비밀번호" v-model="password" prepend-icon="mdi-lock" type="password"
                                required>

                            </v-text-field>
                            <v-text-field label="도시" v-model="city" prepend-icon="mdi-city">

                            </v-text-field>
                            <v-text-field label="상세주소" v-model="street" prepend-icon="mdi-home">

                            </v-text-field>
                            <v-text-field label="우편번호" v-model="zipcode" prepend-icon="mdi-mailbox">

                            </v-text-field>
                            <!-- block은 부모 컨테이너 너비만큼 채우는것 -->
                            <v-btn type="submit" color="primary" block>등록</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            name: "",
            email: "",
            password: "",
            city: "",
            street: "",
            zipcode: ""
        }
    },
    methods: {
        async memberCreate() {
            try {
                // 알아서 json으로 직렬화해줌
                const registerData = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    address: {
                        city: this.city,
                        street: this.street,
                        zipcode: this.zipcode
                    }
                }
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/create`, registerData);
                this.$router.push("/");
            } catch (e) {
                // 이거 할 때 axioserror가 도저히 안 풀린다 싶으면 CORS 에러, config의 CORSCONFIG파일 확인하기
                const error_message = e.response.data.error_message
                console.log(error_message)
                alert(error_message)
            }
        }
    }
};
</script>
