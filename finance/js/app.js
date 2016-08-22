'use strict';
angular.module('app', [])
    .controller('main', function ($scope) {
        $scope.compareOpersByDate = function (a, b) {
            return Date.parse(a.time) < Date.parse(b.time);
        };

        $scope.transactions = [
            createTransaction(5000.00, "2016-07-31T20:22:26Z", "Работа", "Выполнил заказ на фрилансе"),
            createTransaction(-35.00, "2016-07-31T20:24:02Z", "Транспорт", "Проезд на маршрутке")
        ].sort($scope.compareOpersByDate);

        $scope.action = "spent";

        function add(a, b) {
            return a + b;
        }

        function updateBalance() {
            return $scope.transactions.map(function (elem) { return parseFloat(elem.value); }).reduce(add, 0);
        }

        $scope.balance = updateBalance();

        $scope.addTransaction = function() {
            console.log($scope.value, $scope.description, $scope.category);
            if (parseFloat($scope.value) != undefined && $scope.description != undefined &&
                                                                $scope.category != undefined) {
                var value = $scope.money, action = $scope.action, category = $scope.category,
                    description = $scope.description, time = new Date();

                if (action == 'spent') {
                    value = -value;
                }

                var newTransaction = createTransaction(value, time, category, description);
                $scope.transactions.unshift(newTransaction);
                $scope.balance = updateBalance();
                $scope.money = "";
                $scope.category = "";
                $scope.description = "";
            }
        };

        function createTransaction(value, time, category, description) {
            var decoration, val, dt_formatted, dt = new Date(time);
            if (value > 0) {
                val = "+" + value + " ₽";
                decoration = "up";
            } else if (value < 0) {
                val = value + " ₽";
                decoration = "down";
            }

            return {
                value: val,
                time: dt,
                category: category,
                description: description,
                status: 'added',
                decoration: decoration
            }
        }

        function isEmptyString(str) {
            return /^\s*$/.test(str);
        }

        $scope.categories = [
                "Еда и напитки",
                "Мобильная связь",
                "Транспорт",
                "Интернет",
                "Медицина",
                "Работа",
                "Квартира",
                "Магазины",
                "Спорт",
                "Подарки",
                "Одежда",
                "Рестораны и кафе",
                "Путешествия",
                "Другое",
        ]

        $scope.deleteTransaction = function (index) {
            $scope.transactions.splice(index, 1);
            $scope.balance = updateBalance();
        }
    });