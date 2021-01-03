<template>
    <div>
        <div id="lvTable">
            <div class="header-button">
                <div class="toggle">
                    <button class="button_table" @click="toggleButton()">TABLE</button>
                    <button class="button_table" @click="toggleButton()">DDL</button>
                </div>
                <button class="button_table" @click="dialog = !dialog" title="Редактировать value">Редактировать</button>
            </div>

            <div class="ddl" v-if="!show">
                <div class="generate-table">
                    <span>CREATE TABLE categories</span>
                    <br>
                    ( <span v-for="(item, index) in header" :key="index">
                        {{item.name }} {{item.value}} NOT NULL, <br>
                        </span> );
                </div>
                <div class="generate" v-for="(item, index) in tbData" :key="index">
                    <span>INSER INTO categories</span>
                    <br>
                    (<span v-for="(item, index) in header" :key="index">
                        {{item.name}},
                    </span>)
                    <br>
                    VALUES
                    <br>
                    ({{index+1}} <span v-for="(item, index) in item" :key="index">
                        ,{{item}}
                    </span>);

                </div>
            </div>
            <div class="table" v-else>
                <table>
                    <thead>
                        <tr>
                            <th style="text-align: left" v-for="(name, index) in header" :key="index" > 
                                <div class="th">
                                    {{name.name}}
                                </div>
                                <div class="header-modal" v-show="dialog" >
                                    <label for="" >
                                    Value:   <select  v-model="name.value" >
                                                <option >int</option>
                                                <option >varchar</option>
                                                <option >date</option>
                                                <option >datetime</option>
                                            </select>
                                    </label>
                                </div>
                                <div class="header-modal" v-show="dialog" >
                                    <label >
                                    Name: 
                                    </label>
                                    <input type="text" v-model="name.name">
                                </div>
                            </th>
                            <th
                            >
                            X
                            </th>
                        </tr>
                        
                    </thead>
                    <tbody>
                <!-- Заполнение таблицы -->
                        <tr v-for="(entry, index) in tbData" :key="index">
                            <td style="text-align:center"><b>{{index + 1}}</b></td>
                            <td v-for="(name, index) in thData" :key="index">

                                <input type="text" v-model="entry[index ]" :key="index">
                            </td>
                            <td><button class="b20" v-if="tbData.length > 0" v-on:click="fDeleteRow(index)" title="Удалить строку">DELETE</button></td>
                        </tr>
                    </tbody>
                </table>
                <div class="footer">
                    <div class="footer_block">
                        <button v-on:click="fAddNewRow" title="Добавить строку в таблицу">Add Row</button>
                    </div>
                    <div class="footer_block">
                        <label for="">
                            Name<input type="text" v-model="addTh" /> 
                        </label>
                        <label for="">
                            Value   <select  v-model="thData.value" >
                                        <option >int</option>
                                        <option >varchar</option>
                                        <option >date</option>
                                        <option >datetime</option>
                                    </select>
                        </label>
                        <button @click="addColumn">Add Column</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    data() {
        return {
            dialog: false,
            show: true,
            header: [
                {name: 'category_id', value: ''},
                {name: 'category_name', value: ''},
            ],
            tbFullPrice: 0,
            tbData: [
                // Массив строк
                {  },

            ],
            thData: [
                {name: '1', value: ''},
            ],
            addTh: "",
            counter: 0,
            innerValue: ''
        };
    },
    created() {
        console.log('Элементов в строке',this.thData);
    },
    methods: {
        addThData: function () {
        Object.assign(this.thData, { i: this.addTh });
        },
        addColumn: function () {
            this.header.push({name: this.addTh, value: this.thData.value})
            this.thData.push({name: this.addTh, value: ''})

            console.log('Элементов в строке', this.thData);
            console.log('Элементов в хэдере', this.header);
            console.log('Строк', this.tbData);
            
        },
        fAddNewRow: function () {
        // Добавить новую строку в таблицу
        this.tbData.push({ });
        console.log('Колличество строк',this.tbData);
        },
        fDeleteRow: function (index) {
        // Удалить строку с номером index из таблицы
        this.tbData.splice(index, 1);
        },
        fDeleteColumn: function (index) {
        // Удалить строку с номером index из таблицы
        this.header.splice(index, 1)
        },
        toggleButton: function() {
            this.show = !this.show
        }
    },
};
</script>

<style lang="scss" scoped>
* {
    font-size: 12px;
}

table {
    width: 630px;
    margin: auto;
    border: 1px solid #e6ecf6;
    border-radius: 3px;
    background-color: #fff;
}
thead {
    width: 100%;
    position: relative;
}
.th {
    padding: 5px 15px
}
.header-modal {
    background: #e6ecf6;
    padding: 5px 15px;
    select {
        border: 1px solid #f3f8f9
    }
    input { 
        border: 1px solid  #f3f8f9;
    }
}
#lvTable {
    width: 630px;
    margin: 20px 0px 0px 20px;
}
.generate-table {
    padding: 10px;
    background-color: #e6ecf6;
    border-left: 3px solid #478bf8;
    margin-bottom: 10px;
    text-align: center;
}
.generate { 
    padding: 10px;
    background-color: #e6ecf6;
    border-left: 3px solid #478bf8;
}
.header-button {
    display: flex;

}
.button_table {
    padding: 5px 10px;
    border: 2px solid #e6ecf6;
    
    margin-bottom: 2px;
    margin-right: 2px;
    &:hover {
        border: 2px solid #9fa3aa;
        background: #e6ecf6;
    }
    &:focus {
        outline: none
    }
}
.b20{ 
    margin-left: 10px;
}
.footer {
    margin-top: 20px;
    display: flex;
    &_block {
        border: 2px solid #e6ecf6;
        display: flex;
        align-items: center;
        margin-right: 20px;
        select {
            margin-right: 20px;
        }
        input {
            width: 100px;
            margin-left: 10px;
            margin-right: 20px;
            border: 2px solid  #e6ecf6;
            border-radius: 10px;
        }
        button {
            color: rgb(0, 0, 0);
            background-color: #e6ecf6;
            padding: 5px 10px;
            border: 1px solid white;
            &:hover {
                border: 2px solid #9fa3aa;
                background: #e6ecf6;
            }
            &:focus {
                outline: none
            }
        }
    }
}
th,
td {
  /* Общие параметры заголовка и строк */
    min-width: 50px;
    padding: 10px 0px;
    border: 1px solid #e6ecf6;
}
th {
    min-width: 140px;
    background-color:#e7ecf5;
    color: #000000;
    cursor: default;
    
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
input {
    font-family: Helvetica Neue, Arial, sans-serif;
    font-size: 14px;
    color: #000000;

    width: 100%;
}
td {
    background-color: #f3f8f9;
    padding: 10px 5px;
}
</style>