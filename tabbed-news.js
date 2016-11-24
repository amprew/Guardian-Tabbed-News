(function(){
    function TabbedNews(){
        //Prototyping:
            this._addEventListeners = function(){
                this._tabbedNewsHeader.addEventListener("click", this._tabClick.bind(this));
            }
            this._tabClick = function(e){
                if(!e.target.classList.contains("tabbed-news__header-item")) return false;
                this._selectedTab = e.target;
                if(!this._selectedTab.classList.contains("active")){
                    this._selectedTab.classList.add("active");
                    for(var i = 0; i<this._tabbedNewsItems.length; i++){
                        if(this._tabbedNewsItems[i].classList.contains("active") && this._tabbedNewsItems[i] !== this._selectedTab) this._tabbedNewsItems[i].classList.remove("active");
                    }
                    this._getLinksJSON(this._selectedTab.getAttribute("data-source"));
                }
            }
            this._getLinksJSON = function(source){
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function(){
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        this._data = JSON.parse(xhttp.response).response.results;
                        this._renderData();
                    }
                }.bind(this);
                xhttp.open("GET", "http://content.guardianapis.com/search?q="+(encodeURIComponent(source))+"&api-key=9wur7sdh84azzazdt3ye54k4", true);
                xhttp.send(null);
            }
            this._renderData = function(){
                var showData = function(){
                    this._dataList.innerHTML = "";
                    if(document.querySelector(".no-selection").style.display != "none") document.querySelector(".no-selection").style.display = "none";
                    this._data.forEach(function(el, index){
                        var list_item = document.createElement("li");
                        var list_item_link = document.createElement("a");
                            list_item_link.setAttribute("href", el.webUrl);
                            list_item_link.setAttribute("target", "_blank");
                            list_item_link.innerText = el.webTitle;

                        list_item.appendChild(list_item_link);
                        this._dataList.appendChild(list_item);
                    }.bind(this));
                    this._dataList.style.opacity = 1;
                }.bind(this);

                if(this._dataList.childNodes.length){
                    this._dataList.addEventListener("transitionend", showData);
                    this._dataList.style.opacity = 0;
                }else{
                    showData()
                }
            }

        //constructor:
            this._tabbedNews = document.querySelector(".tabbed-news");
            this._tabbedNewsHeader = document.querySelector(".tabbed-news__header");
            this._selectedTab;
            this._tabbedNewsItems = this._tabbedNewsHeader.querySelectorAll(".tabbed-news__header-item");
            this._dataList = document.querySelector(".tabbed-news_link-list");
            this._data = [];
            this._addEventListeners();
    }

    new TabbedNews();
}());
