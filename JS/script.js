var app = angular.module("myProject", ["ngRoute"]);

        app.config(function($routeProvider)  
        {
            $routeProvider
            .when("/",{
                templateUrl: "home.html"
                // controller: "homeController"
            })
            .when("/products",{
                templateUrl: "products.html",
                controller: "productController"
            })
            .when("/dryfruits",{
                templateUrl: "dryfruits.html",
                controller:"dryController"
            })
            .when("/nuts",{
                templateUrl: "nuts.html",
                controller:"nutsController" 
            })
            .when("/seeds",{
                templateUrl: "seeds.html",
                controller:"seedsController"
            })
            .when("/combopacks",{
                templateUrl: "combopacks.html",
                controller:"comboController"  
            })
            .when("/productdetail",{
                templateUrl: "productdetail.html",
                controller: "detailController"
            })
            .when("/offers",{
                templateUrl: "offers.html",
                controller: "offersController"
            })
            .when("/about",{
                templateUrl: "about.html"
            })
            .when("/contact",{
                templateUrl: "contact.html"
            })
            .when("/wishlist",{
                templateUrl: "wishlist.html",
                controller: "wishlistController"
            })
            .when("/cart",{
                templateUrl: "cart.html",
                controller: "cartController"
            })
            .when("/checkout",{
                templateUrl: "checkout.html",
                controller: "checkoutController"
            })
            .when("/signin",{
                templateUrl: "signin.html",
                controller: "signinController"
            })
            .when("/signup",{
                templateUrl: "signup.html"
            })
        });

        window.onscroll = function() {myFunction()};

        var navbar = document.getElementById("nav-bar");
        var sticky = navbar.offsetTop;

        function myFunction() 
        {
            if (window.pageYOffset >= sticky) 
            {
                navbar.classList.add("sticky")
            } 
            else 
            {
                navbar.classList.remove("sticky");
            }
        }

        app.run(function($rootScope, $http)
        {
            $rootScope.confirmAlert;
            // $rootScope.state = localStorage.getItem("state");
            $rootScope.shipping;
            $rootScope.shipDay;
            $rootScope.shipFee; //display value in shipping Estimate
            $rootScope.shipCost = 0; //total ship fee after selection
            $rootScope.carts = [];
            $rootScope.wishlist = [];


            const div = document.createElement('div');
            div.style.maxHeight = "400px";
            div.style.margin = "0";
            div.style.padding = "24px";
            div.style.whiteSpace = "pre-wrap";
            div.style.textAlign = "justify";
            div.style.overflowY = "scroll";
            
            const para_1 = document.createElement('p');
            para_1.textContent = 'This site and all information, content, materials, products (including software) and services included on or otherwise made available to you through this site are provided by Maru Dry Fruits on an “as is” and “as available” basis, unless otherwise specified in writing.Maru Dry Fruits makes no representations or warranties of any kind, express or implied, as to the operation of this site or the information, content, materials, products (including software) or services included on or otherwise made available to you through this site, unless otherwise specified in writing. You expressly agree that your use of this sites at your sole risk.';
            const para_2 = document.createElement('p');
            para_2.textContent = 'To the full extent permissible by applicable law, Maru Dry Fruits disclaims all warranties, express or implied, including, but not limited to, implied warranties of merchantability and fitness for a particular purpose. Maru Dry Fruits does not warrant that this site; information, content, materials, products (including software) or services included on or otherwise made available to you through this site; their servers; or electronic communications sent from Maru Dry Fruits are free of viruses or other harmful components. Maru Dry fruits will not be liable for any damages of any kind arising from the use of this site or from any information, content, materials, products (including software) or services included on or otherwise made available to you through this site, including, but not limited to direct, indirect, incidental, punitive, and consequential damages, unless otherwise specified in writing.';
            const para_3 = document.createElement('p');
            para_3.textContent = 'Maru  Dry Fruits and technology partners make no representations or warranties about the accuracy, reliability, completeness, and/or timeliness of any content, information, software, text, graphics, links or communications provided on or through the use of the Website or that the operation of the Website will be error free and/or uninterrupted. Consequently, Maru Dry Fruits assumes no liability whatsoever for any monetary or other damage suffered by you on account of the delay, failure, interruption, or corruption of any data or other information transmitted in connection with use of the Website; and/or any interruption or errors in the operation of the Website.';

            div.appendChild(para_1);
            div.appendChild(para_2);
            div.appendChild(para_3);


            $rootScope.popDisclaimer = function()
            {
                alertify.confirm('Delivery Disclaimer', div, function(){
                    // alertify.success('Accepted');
                },function(){
                    // alertify.error('Declined');
                }).setting(
                    {
                        labels:{ok:'OK', cancel: 'Close'}, 
                        padding: false, 
                        'reverseButtons': true
                    });
            }


            $rootScope.addToCart = function(product)
            {
                // var found = findItemById($rootScope.carts, product.id);
                // if (found) 
                // {
                //     found.p_qty == product.qty;
                // }
                if ($rootScope.carts.length > 0)
                {
                    for (var i = 0; i < $rootScope.carts.length; i++)
                    {
                        if (product.id === $rootScope.carts[i].p_id)
                        {
                            $rootScope.carts[i].p_qty = product.qty;
                            break;
                        }
                        else if (i == ($rootScope.carts.length-1))
                        {
                            $rootScope.carts.push(
                            {"p_id": product.id, 
                            "p_name": product.name, 
                            "p_img": product.img, 
                            "p_price": product.price, 
                            "p_description": product.description, 
                            "p_cat": product.cat,
                            "p_qty": product.qty});
                        }
                    }
                }
                else
                {
                    $rootScope.carts.push(
                        {"p_id": product.id, 
                        "p_name": product.name, 
                        "p_img": product.img, 
                        "p_price": product.price, 
                        "p_description": product.description, 
                        "p_cat": product.cat,
                        "p_qty": product.qty});
                }
                alert("Add to cart successfully");
                $("html, body").animate({ scrollTop: 0 }, 200);
            }

            $rootScope.addToWish = function(product)
            {
                // var found = findItemById($rootScope.carts, product.id);
                // if (found) 
                // {
                //     found.p_qty == product.qty;
                // }
                if ($rootScope.wishlist.length > 0)
                {
                    for (var i = 0; i < $rootScope.wishlist.length; i++)
                    {
                        if (product.id === $rootScope.wishlist[i].p_id)
                        {
                            break;
                        }
                        else if (i == ($rootScope.wishlist.length-1))
                        {
                            $rootScope.wishlist.push(
                            {"p_id": product.id, 
                            "p_name": product.name, 
                            "p_img": product.img, 
                            "p_price": product.price, 
                            "p_description": product.description, 
                            "p_cat": product.cat,
                            "p_qty": product.qty});
                        }
                    }
                }
                else
                {
                    $rootScope.wishlist.push(
                        {"p_id": product.id, 
                        "p_name": product.name, 
                        "p_img": product.img, 
                        "p_price": product.price, 
                        "p_description": product.description, 
                        "p_cat": product.cat,
                        "p_qty": product.qty});
                }
                alert("Add to wishlist successfully");
            }

            $rootScope.syncQty = function(item)
            {
                for (var i = 0; i < $rootScope.plist.length; i++)
                {
                    if (item.p_id == $rootScope.plist[i].id)
                    {
                        $rootScope.plist[i].qty = item.p_qty;
                        alert("Product's quantity has been updated");
                    }
                    break;
                }
            }

            $rootScope.removeItem = function(item) 
            {
                var index = $rootScope.carts.indexOf(item);
                $rootScope.carts.splice(index, 1);
            };

            $rootScope.removeWish = function(item) 
            {
                var index = $rootScope.wishlist.indexOf(item);
                $rootScope.wishlist.splice(index, 1);
            };

            $rootScope.getSubTotal = function()
            {
                var subTotal = 0;
                if ($rootScope.carts.length > 0)
                {
                    for (var i = 0; i < $rootScope.carts.length; i++)
                    {
                        subTotal += $rootScope.carts[i].p_qty * $rootScope.carts[i].p_price;
                    }
                }
                return subTotal;
            }

            $rootScope.getTotal = function()
            {
                var total = 0;
                total = $rootScope.getSubTotal() + $rootScope.shipCost;
                return total;
            }

            $rootScope.totalItem = function()
            {
                var totalItem = '';
                if ($rootScope.carts.length > 1)
                {
                    totalItem += $rootScope.carts.length + ' items';
                }
                else
                {
                    totalItem += $rootScope.carts.length + ' item';
                }
                return totalItem;
            }

            $rootScope.applyOffer = function(item)
            {
                var index = $rootScope.offers.indexOf(item);
                if (confirm("Apply this coupon?") == true)
                {
                    $rootScope.offers.splice(index, 1);
                    alert("Apply coupon successfully!");
                    return;
                }
                else
                {
                    return;
                }
            }

            $rootScope.scrollUp = function()
            {
                $("html, body").animate({ scrollTop: 0 }, 200);
            }

            $http.get("JSON/product.json").then(function(response)
            {
                $rootScope.plist = response.data.productList;   
            })
            $http.get("JSON/user.json").then(function(response)
            {
                $rootScope.list = response.data.userList;
            })
            $http.get("JSON/offers.json").then(function(rsp)
            {
                $rootScope.offers = rsp.data.offersList;
            })
            $http.get("JSON/city.json").then(function(rsp)
            {
                $rootScope.cities = rsp.data.cityList;
            })
            $http.get("JSON/topsale1.json").then(function(response)
            {
                $rootScope.slist = response.data.productList20;   
            })
            $http.get("JSON/topsale.json").then(function(response)
            {
                $rootScope.newlist = response.data.productList2;   
            })
            $http.get("JSON/dryfruits.json").then(function(response)
            {
                $rootScope.dlist = response.data.dryfruitList;   
            })
            $http.get("JSON/nuts.json").then(function(response)
            {
                $rootScope.nlist = response.data.nutList;
            })
            $http.get("JSON/seeds.json").then(function(response)
            {
                $rootScope.elist = response.data.seeds;
            })
            $http.get("JSON/combopacks.json").then(function(response)
            {
                $rootScope.clist = response.data.combopacks;
            })
        });

        app.service("stateService", function()
        {
            this.state = sessionStorage.getItem("state");
        });

        app.service("shippingService", function()
        {
            this.shipping = "";
        });

        // app.service("qtyService", function($rootScope)
        // {
        //     for (var i = 0; i < $rootScope.plist.length; i++)
        //     {
        //         for (var j = 0; j < $rootScope.carts.length; j++)
        //         {
        //             if (($rootScope.plist[i].id == $rootScope.carts[j].p_id) && ($rootScope.plist[i].qty != $rootScope.carts[j].p_qty))
        //             {
        //                 $rootScope.plist[i].qty = $rootScope.carts[j].p_qty;
        //             }
        //         }
        //     }
        // })

        app.controller("productController", function($rootScope,$scope)
        {
            $scope.clickProduct=function(event){
                $rootScope.selectProduct=event
            }
            $scope.editing = false;
            //     $scope.addItem = function(item) {
            //     $scope.productList.push(item);
            // };
        
            // $scope.myCartItems = [];
    
            //  $scope.addcart = function()
            // {
            //     $rootScope.myCartItems.push(plist);
            //     alert("add item success")
            // }

        })

        app.controller("dryController", function($rootScope,$scope)
        {
            $scope.clickProduct=function(event){
                $rootScope.selectProduct=event
            }
        })
        app.controller("nutsController", function($rootScope,$scope)
        {
            $scope.clickProduct=function(event){
                $rootScope.selectProduct=event
            }
        })
        app.controller("seedsController", function($rootScope,$scope)
        {
            $scope.clickProduct=function(event){
                $rootScope.selectProduct=event
            }
        })
        app.controller("comboController", function($rootScope,$scope)
        {
            $scope.clickProduct=function(event){
                $rootScope.selectProduct=event
            }
        })

        app.controller("detailController",function($scope,$http,$rootScope)
        {
            
            $scope.showImage=function(event){

           $scope.showImg=event.target.title
       
            }
            $scope.myShow=true;
            $scope.myNu=true;
            $scope.myreview=true;

            $scope.btn5=function(){
                $scope.myShow= !$scope.myShow;
            }
            $scope.btn6=function(){
                $scope.myNu= !$scope.myNu;
            }
            $scope.btn7=function(){
                $scope.myreview= !$scope.myreview;
            }
        })

        app.controller("offersController", function($scope)
        {
            $scope.leftScroll = function()
            {
                document.querySelector('div.product-container').scrollLeft -= 500;
            }
            $scope.rightScroll = function()
            {
                document.querySelector('div.product-container').scrollLeft += 500;
            }
        })

        app.controller("signinController", function($scope, $location)
        {
            $scope.btn2 = function(path)
            {
                for (var i = 0; i<$scope.list.length; i++)
                {
                    if (($scope.email == $scope.list[i].email) && ($scope.pass == $scope.list[i].pass))
                    {
                        sessionStorage.setItem("name", $scope.list[i].name);
                        sessionStorage.setItem("email", $scope.list[i].email);
                        sessionStorage.setItem("pass", $scope.list[i].pass);
                        sessionStorage.setItem("telephone", $scope.list[i].telephone);
                        sessionStorage.setItem("address", $scope.list[i].address);
                        sessionStorage.setItem("state", $scope.list[i].state_code);
                        $location.path("/");
                        return;
                    }
                    else if (i == ($scope.list.length-1))
                    {
                        alert("Wrong account");
                        return;
                    }
                }
                
            }
        })

        app.controller("signupController", function($scope,$location)
        {
            $scope.btn3 = function(path){
                //tao 1 doi tuong JSON, noi dung gia tri cac o input o form
                var newuser = {"name": $scope.name,
                 "email": $scope.email,
                  "pass": $scope.pass,
                "telephone": $scope.telephone,
                "address": $scope.address};

                //them vao danh sach bang phuong thuc push()
                $scope.list.push(newuser);
                alert("Add new user successfully");
                $location.path("/signin");
            }
        })

        app.controller("wishlistController", function($scope,$rootScope)
        {

        })

        app.controller("cartController", function($scope, $rootScope, $location, stateService)
        {
            $scope.gift1 = false;
            $scope.gift2 = false;
            if ($scope.selectAll == true)
            {
                alert("This is an alert");
            }

            $scope.$watch('state', function()
            {
                if ($scope.state != stateService.state)
                {
                    stateService.state = $scope.state;
                }
                else
                {
                    $scope.state = 0;
                }
            });

            // !binding value of state
            $scope.$watch('state', function()
            {
                if (parseInt($scope.state) < 1000)
                {
                    $rootScope.shipDay = 5;
                    $rootScope.shipFee = 20000;
                }
                else
                {
                    $rootScope.shipDay = 10;
                    $rootScope.shipFee = 50000;
                }
            })

            $scope.giftPackCheck = function()
            {
                var gift = $('.gift:checked');
                if (gift.length == 0)
                {
                    $("html, body").animate({ scrollTop: 0 }, 200);
                    $scope.giftAlert = true;
                    return false
                }
                else
                {
                    for (var i = 0; i < $rootScope.carts.length; i++)
                    {
                        if (($rootScope.carts[i].p_id == "26") || ($rootScope.carts[i].p_id == "27") )
                        {
                            return false;
                        }
                    }
                    if ($scope.gift1 == true)
                    {
                        $rootScope.carts.push(
                            {"p_id": "26", 
                            "p_name": "Fresh Fruity 1 - For visiting friends", 
                            "p_img": "gift1.webp", 
                            "p_price": "0", 
                            "p_description": "Festival Gift Packs", 
                            "p_cat": "gift packs",
                            "p_qty": "1"});
                    }

                    if ($scope.gift2 == true)
                    {
                        $rootScope.carts.push(
                            {"p_id": "27", 
                            "p_name": "Gorgeous Combo Packs - For ceremony", 
                            "p_img": "gift2.jpeg", 
                            "p_price": "0", 
                            "p_description": "Festival Gift Packs", 
                            "p_cat": "gift packs",
                            "p_qty": "1"});
                    }
                    
                    $("html, body").animate({ scrollTop: 0 }, 200);
                    $scope.giftAlert = false;
                    $scope.giftSuccessAlert = true;
                    return false
                }
            }

            $scope.shipCheck = function()
            {
                if ($scope.shipping == undefined)
                {
                    $("html, body").animate({ scrollTop: 0 }, 200);
                    $scope.shipCheckAlert = true;
                }
                else
                {
                    $("html, body").animate({ scrollTop: 0 }, 200);
                    $scope.shipCheckAlert = false;
                    $scope.shipCheckSuccess = true;
                    $scope.shipTotal = true;
                    if ($scope.shipping == 'ship-1')
                    {
                        $rootScope.shipCost = 0;
                    }
                    else if (($scope.shipping == 'ship-2') && (parseInt($scope.state) >= 1000))
                    {
                        $rootScope.shipCost = 50000;
                    }
                    else if (($scope.shipping == 'ship-2') && (parseInt($scope.state) < 1000))
                    {
                        $rootScope.shipCost = 20000;
                    }
                }
                // ?wrong AlertJS
                // alertify.defaults.transition = "slide";
                // alertify.confirm('Please select the preferred shipping method {{shipping}}', 
                //                 div, function()
                // {
                //     alertify.success('OK');
                // },function()
                // {
                //     alertify.error('Canceled');
                // })
                // .setting(
                // {
                //     labels:{ok:'Apply', cancel: 'Cancel'}, 
                //     padding: false, 
                //     'onok': function()
                //     {
                //         // alert("$scope.shipping value: ", shipping);
                //         if ($scope.shipping == undefined)
                //         {
                //             alert("This is an alert");
                //             return false;
                //         } 
                //         // else
                //         // {
                //         //     alert("This is not an alert");
                //         // }
                //         // else if (ship == 'freeship')
                //         // {
                //         //     alert(state);
                //         //     return true;
                //         // }
                //         alertify.success('Your shipping estimate has been applied');
                //     },
                //     'oncancel': function(){ alertify.error('Canceled');},
                //     'reverseButtons': true
                // });
            }

            $scope.toCheckout = function(path)
            {
                if ($rootScope.carts.length <= 0)
                {
                    $("html, body").animate({ scrollTop: 0 }, 200);
                    $scope.goCheckout = true;
                    return false;
                }
                else
                {
                    $scope.goCheckout = false;
                    $location.path("/checkout");
                    $("html, body").animate({ scrollTop: 0 }, 200);
                    return;
                }
            }
        })

        app.controller("checkoutController", function($scope, $rootScope, $location, stateService, shippingService)
        {
            $scope.allowUpdate = true;
            $scope.hideAndShow = false;
            $scope.showCredit = false;
            $scope.showCouponTrue = false;
            $scope.showCouponFalse = false;
            $scope.showAddress2 = false;
            $scope.confirmAbled = false;
            $scope.cardShow;
            $scope.coupon = '';

            const div = document.createElement('div');
            div.style.maxHeight = "400px";
            div.style.margin = "0";
            div.style.padding = "24px";
            div.style.whiteSpace = "pre-wrap";
            div.style.textAlign = "justify";
            div.style.overflowY = "scroll";
            
            const para_1 = document.createElement('p');
            para_1.textContent = 'This site and all information, content, materials, products (including software) and services included on or otherwise made available to you through this site are provided by Maru Dry Fruits on an “as is” and “as available” basis, unless otherwise specified in writing.Maru Dry Fruits makes no representations or warranties of any kind, express or implied, as to the operation of this site or the information, content, materials, products (including software) or services included on or otherwise made available to you through this site, unless otherwise specified in writing. You expressly agree that your use of this sites at your sole risk.';
            const para_2 = document.createElement('p');
            para_2.textContent = 'To the full extent permissible by applicable law, Maru Dry Fruits disclaims all warranties, express or implied, including, but not limited to, implied warranties of merchantability and fitness for a particular purpose. Maru Dry Fruits does not warrant that this site; information, content, materials, products (including software) or services included on or otherwise made available to you through this site; their servers; or electronic communications sent from Maru Dry Fruits are free of viruses or other harmful components. Maru Dry fruits will not be liable for any damages of any kind arising from the use of this site or from any information, content, materials, products (including software) or services included on or otherwise made available to you through this site, including, but not limited to direct, indirect, incidental, punitive, and consequential damages, unless otherwise specified in writing.';
            const para_3 = document.createElement('p');
            para_3.textContent = 'Maru  Dry Fruits and technology partners make no representations or warranties about the accuracy, reliability, completeness, and/or timeliness of any content, information, software, text, graphics, links or communications provided on or through the use of the Website or that the operation of the Website will be error free and/or uninterrupted. Consequently, Maru Dry Fruits assumes no liability whatsoever for any monetary or other damage suffered by you on account of the delay, failure, interruption, or corruption of any data or other information transmitted in connection with use of the Website; and/or any interruption or errors in the operation of the Website.';

            div.appendChild(para_1);
            div.appendChild(para_2);
            div.appendChild(para_3);

            var disclaimerCheck = $('#disclaimerCheck');

            $scope.popDisclaimer = function()
            {
                alertify.confirm('Delivery Disclaimer', div, function(){
                    alertify.success('Accepted');
                },function(){
                    alertify.error('Declined');
                }).setting(
                    {
                        labels:{ok:'Accept', cancel: 'Decline'}, 
                        padding: false, 
                        'onok': function()
                        {
                            $scope.confirmAbled = true;
                            disclaimerCheck.prop('checked', true);
                            alertify.success('Accepted');
                        },
                        'oncancel': function(){ alertify.error('Declined');},
                        'reverseButtons': true
                    });
            }

            
            $scope.state = stateService.state;

            $scope.couponCheck = function()
            {
                for (var i = 0; i < $rootScope.offers.length; i++)
                {
                    if ($scope.coupon == $rootScope.offers[i].code)
                    {
                        $rootScope.offers.splice(i, 1);
                        $scope.showCouponTrue = true;
                        $scope.showCouponFalse = false;
                        return;
                    }
                    else
                    {
                        $scope.showCouponTrue = false;
                        $scope.showCouponFalse = true;
                        return;
                    }
                }
            }
            

            // !binding value of state
            $scope.$watch('state', function()
            {
                if ($scope.state < 1000)
                {
                    $rootScope.shipDay = 5;
                    $rootScope.shipFee = 20000;
                }
                else
                {
                    $rootScope.shipDay = 10;
                    $rootScope.shipFee = 50000;
                }
            })

            $scope.checkshipping = shippingService.shipping;

            $scope.$watch('state', function()
            {
                if (shippingService.shipping == "")
                {
                    shippingService.shipping = $scope.shipping;
                }
                else
                {
                    $scope.shipping = shippingService.shipping;
                }
            });

            $scope.$watch('shipping', function()
            {
                if ($scope.shipping == 'ship-1')
                {
                    $rootScope.shipCost = 0;
                    document.getElementById("checkout-ship1").prop('checked', true);
                }
                else
                {
                    $rootScope.shipCost = $rootScope.shipFee;
                    document.getElementById("checkout-ship2").prop('checked', true);
                }
            })


            $scope.confirmFinish = function(path)
            {
                if ($scope.shipping == undefined)
                {
                    $("html, body").animate({ scrollTop: 0 }, 200);
                    $rootScope.shippingAlert = true;
                    return false;
                }
                // else if ($scope.shipping == 'ship-1')
                // {
                //     alert("This is an alert");
                // }
                else if ($scope.payment == undefined)
                {
                    $("html, body").animate({ scrollTop: 0 }, 200);
                    $scope.shippingAlert = false;
                    $scope.paymentAlert = true;
                    return false;
                }
                else if ($scope.cardShow == true)
                {
                    $scope.shippingAlert = false;
                    $scope.paymentAlert = false;
                    $("html, body").animate({ scrollTop: 0 }, 200);
                    return false;
                }
                else if ($scope.confirmAbled  == false)
                {
                    $scope.shippingAlert = false;
                    $scope.paymentAlert = false;
                    $scope.disclaimerAlert = true;
                    return false;
                }
                $rootScope.confirmAlert = true;
                $location.path("/");
                $("html, body").animate({ scrollTop: 0 }, 200);
                return;
            }
        })

        app.filter("phoneFilter", function()
        {
            return function(x)
            {
                var tel = x.slice(0,4) + ' ' + x.slice(4,7) + ' ' + x.slice(7,10);
                return tel;
            }
        })

        app.filter("vndFilter", function()
        {
            return function(x)
            {
                var price = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
                return price;
            }
        })
