class UrlFactory{
    project = null;
    baseUrl = null;
    currentUrl = null;
    constructor(){
        this.baseUrl = window.location.host;
        
        this.setAppProject();
    }

    setProject = (project) =>{
        this.project = project;
    }

    buildLink = (url) =>{
        let projectLink = null;
        if(url){
            projectLink = `/${this.project}/${url}`;
        }
        else{
            projectLink = `/${this.project}`;
        }

        return projectLink;
    }

    setAppProject = () => {
        this.currentUrl = window.location.href;
        let strippedUrl = this.currentUrl.replace('http://','');
        strippedUrl = strippedUrl.replace('https://','');
        strippedUrl = strippedUrl.replace(this.baseUrl + '/','');
        let splitUrl = strippedUrl.split('/');
        console.log(splitUrl);

        if(!splitUrl[0]){
            this.project = null;
        }
        else{
            this.project = splitUrl[0];
        }
    }

    checkHasProject = () => {
        if(this.project){
            return this.currentUrl.includes(this.project);
        }
        else {
            return false;
        }
    }

    getProject = () => {
        return this.project;
    }

}

export let urlFactory = new UrlFactory();
