<template>
    <h1>store test component</h1><br>
    <StoreTestComponent2></StoreTestComponent2><br><br><br><br>
    <StoreTestComponent3></StoreTestComponent3>
</template>

<script>
import StoreTestComponent2 from '@/components/practice/StoreTestComponent2.vue';
import StoreTestComponent3 from '@/components/practice/StoreTestComponent3.vue';

export default{
    data(){

    },
    components:{
        StoreTestComponent2,
        StoreTestComponent3
    }
}

</script>