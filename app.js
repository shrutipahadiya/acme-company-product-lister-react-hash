
const root = document.querySelector('#root')

class App extends React.Component {
    state = {
        companies: [], //fetch('https://acme-users-api-rev.herokuapp.com/companies'),
        products: [], //fetch('https://acme-users-api-rev.herokuapp.com/products'),
        view: window.location.hash.slice(1)
    }

    componentDidMount() {


        console.log("componentDidMount called !!!! ");
        Promise.all([axios.get('https://acme-users-api-rev.herokuapp.com/api/companies'), axios.get('https://acme-users-api-rev.herokuapp.com/api/products')])
            .then(values => {
                this.setState({ companies: values[0], products: values[1] })
            })

            
            window.addEventListener('hashchange',(ev) => {
                const view = window.location.hash.slice(1)
                console.log("hashchnage called ")
                this.setState ({view})
            

                


            })
    }


    render() {
        // return this.state.products.map((product,idx) => {
        //   return React.createElement('p',{key:idx},product.name)
        // })
        const {companies,products,view} = this.state
        const nav = React.createElement(Nav,{companies,products,view})
      
        let chosenView ;
        console.log(this.state)
        if(products.data ){

      //  return React.createElement('ul',null,React.createElement(ProductsList,{products}))
   
            console.log(view)

        if(view == 'companies'){
            chosenView  = React.createElement('ul',null,React.createElement(CompaniesList,{companies}))

        }
         if(view == 'products'){
            chosenView  = React.createElement('ul',null,React.createElement(ProductsList,{products}))
        }
        else{
            chosenView = 'hello , pick a category'
        }

      return React.createElement('div',null,nav,chosenView)
    }else{
        return "loading"
    }
}
}




class Nav extends React.Component{
    render(){
        const {companies,products} = this.props
       const menuItem1 = React.createElement('a',
       { 
           onClick : () => {
            window.location.hash = 'companies'
          //  this.props.views = 'companies'
         }},
         `companies\(${companies.data.length}\)` )
       

         const menuItem2 = React.createElement('a',
         { 
             onClick : () => {
              window.location.hash = 'products'
           //   this.props.views = 'products'
           }},
           `products\(${products.data.length}\)` )
       
        return React.createElement('div',null,menuItem1,menuItem2)  
           
    }


    }




class CompaniesList extends React.Component{
    render(){
        console.log(this.props)
             const {companies} = this.props
         return companies.data.map((element,idx) => {
     return React.createElement('li',{key:idx},element.name)
            })
           
    }


    }


    class ProductsList extends React.Component{
        render(){
           
                 const {products} = this.props
             return products.data.map((element,idx) => {
         return React.createElement('li',{key:idx},element.name)
                })
               
        }
    
    
        }
    





ReactDOM.render(React.createElement(App), root, () => {
    console.log('I have rendered!');
  })