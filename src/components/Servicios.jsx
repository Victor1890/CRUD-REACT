import React, { Component } from 'react';
import firebase from '../config/firebase';

class Servicios extends Component{

    constructor(props){
        super(props);
        this.state = {
            nombre:'',
            apellido:'',
            monto:0,
            tiempo:null,
            cuotas:null,
            fecha:null,
            datas:[],
        };
        this.consulta = this.consulta.bind(this);
    }

    componentDidMount(){
        firebase.database()
        .ref('Servicios')
        .on('value', snapshop => {
            snapshop.forEach(item => {
                let data = {
                    key: item.key,
                    nombre:item.val().nombre,
                    apellido:item.val().apellido,
                    tiempo:item.val().tiempo,
                    cuotas:item.val().cuotas,
                    fecha:item.val().fecha,
                    monto:item.val().monto,
                };
                this.setState({
                    datas: this.state.datas.concat(data),
                });
            });
            

            console.log(this.state.datas);
        });
    }


    fSubmit(e){
        e.preventDefault();
        
        document.querySelector('input').reset();
        firebase.database().ref('Servicios')
        .push({
            nombre:this.state.nombre,
            apellido:this.state.apellido,
            tiempo:this.state.tiempo,
            cuotas:this.state.cuotas,
            fecha:this.state.fecha,
            monto:this.state.monto,
        });
        this.consulta();
    }

    fRemove(e){

        firebase.database().ref('Servicios/' + e).once('child_removed', snapshop => {
            console.log(snapshop.val());
        });

        const adaRef = firebase.database().ref('Servicios/' + e);
        adaRef.remove()
        .then((result) => {
            console.log("Remove succeeded.");

            this.consulta();
        })
        .catch(error => {
            console.log(`Error`)
            this.consulta();
        });
    }

    consulta(){
        
        return(
            <div>
                {this.state.datas.map((item, i) => (
                    <ul key={item.key} className='list-group'>
                        <li className='list-group-item'>
                            {i + 1}, <span className='alert-link'>Nombre:</span> {item.nombre}, <span className='alert-link'>Monto:</span> {item.monto}
                            
                            <button onClick={(e) => console.log('holaa1')} type="button" className="btn btn-success">Editar</button>
                            <button onClick={() => this.fRemove(item.key)} type="button" className="btn btn-success">Eliminar</button>
                        </li>
                    </ul>
                ))}
            </div>
        );
    }
    
    render(){
        return(
            <div>
                <form onReset={true} onSubmit={e => this.fSubmit(e)} className="group-form">
                
                    <div className="form-group mx-sm-3">
                        <input onChange={e => this.setState({nombre:e.target.value})} type="text" className="form-control" placeholder="Nombre"/>
                    </div>

                    <div className="form-group mx-sm-3">
                        <input onChange={e => this.setState({apellido:e.target.value})} type="text" className="form-control" placeholder="Apellido"/>
                    </div>

                    <div className="form-group mx-sm-3">
                        <input onChange={e => this.setState({tiempo:e.target.value})} type="text" className="form-control" placeholder="Tiempo para pagar"/>
                    </div>

                    <div className="form-group mx-sm-3">
                        <input onChange={e => this.setState({cuotas:e.target.value})} type="text" className="form-control" placeholder="Cuota"/>
                    </div>

                    <div className="form-group mx-sm-3">
                        <input onChange={e => this.setState({monto:e.target.value})} type="text" className="form-control" placeholder="Monto"/>
                    </div>

                    <div className="form-group mx-sm-3">
                        <input onChange={e => this.setState({fecha:e.target.value})} type="date" className="form-control" placeholder="Monto de Prestamos"/>
                    </div>

                    <button type="submit" className="btn btn-success btn-lg btn-block">Agregar</button>
                    
                </form>

                <div>
                    {this.consulta()}
                </div>
            </div>
        );
    }
}

export default Servicios;