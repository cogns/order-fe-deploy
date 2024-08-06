<template>
    <v-container>
        <v-row class="d-flex justify-content-between mt-5">
            <v-col>
                <v-form @submit.prevent="searchProducts">
                    <v-row>
                        <v-col cols="auto">
                            <v-select v-model="searchType" :items="searchOptions" item-title="text" item-value="value">
                            </v-select>
                        </v-col>

                        <v-col>
                            <v-text-field v-model="searchValue" label="Search">
                            </v-text-field>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn type="submit">검색</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
            <v-col cols="auto" v-if="!isAdmin">
                <v-btn color="secondary" class="mr-2">장바구니</v-btn>
                <v-btn color="success">주문하기</v-btn>
            </v-col>
            <v-col cols="auto" v-if="isAdmin">
                <v-btn href="/product/create" color="success">상품등록</v-btn>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-h6 text-center">{{ pageTitle }}</v-card-title>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <th>제품사진</th>
                                    <th>제품명</th>
                                    <th>가격</th>
                                    <th>재고수량</th>
                                    <th v-if="!isAdmin">주문수량</th>
                                    <th v-if="!isAdmin">주문선택</th>
                                    <th v-if="isAdmin">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="p in productList" :key="p.id">
                                    <td>
                                        <v-img :src="p.imagePath" style="height: 100px; width:auto;"></v-img>

                                    </td>
                                    <td>{{ p.name }}</td>
                                    <td>{{ p.price }}</td>
                                    <td>{{ p.stockQuantity }}</td>
                                    <td></td>
                                    <td></td>
                                    <td v-if="isAdmin">
                                        <v-btn color="secondary" @click="deleteProduct(p.id)">삭제</v-btn>
                                    </td>
                                </tr>
                            </tbody>

                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    props: ['isAdmin', 'pageTitle'],

    data() {
        return {
            searchType: 'optional',
            searchOptions: [
                { text: "선택", value: 'optional' },
                { text: "상품명", value: 'name' },
                { text: "카테고리", value: 'category' },

            ],
            searchValue: "",
            productList: [],

        }
    },
    created() {
        this.loadProduct();
    },

    methods: {
        searchProducts() {

        },
        deleteProduct(productId) {
            console.log(productId)
        },
        async loadProduct() {
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/product/list`);
                this.productList = response.data.result.content;
                console.log(response.data);
            } catch (e) {
                console.log(e);
            }
        }
    }
}
</script>