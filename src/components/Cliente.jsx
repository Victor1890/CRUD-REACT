import React, { Component } from 'react';
import firebase from '../config/firebase';

class Cliente extends Component{

    constructor(props){
        super(props);
        this.state = {
            nombre:'',
            apellido:'',
            direccion:'',
            cedula:'',
            monto:0,
            datas:[],
        };
        this.consulta = this.consulta.bind(this);
    }

    componentDidMount(){
        firebase.database()
        .ref('Cliente')
        .on('value', snapshop => {
            snapshop.forEach(item => {
                let data = {
                    key: item.key,
                    nombre:item.val().nombre,
                    apellido:item.val().apellido,
                    direccion:item.val().direccion,
                    cedula:item.val().cedula,
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
        
        firebase.database().ref('Cliente')
        .push({
            nombre:this.state.nombre,
            apellido:this.state.apellido,
            direccion:this.state.direccion,
            cedula:this.state.cedula,
            monto:this.state.monto,
        });
        this.consulta();
    }

    fRemove(e){
        console.log(e);

        firebase.database().ref('Cliente/' + e).once('child_removed', snapshop => {
            console.log(snapshop.val());
        });

        const adaRef = firebase.database().ref('Cliente/' + e);
        adaRef.remove()
        .then((result) => {
            console.log("Remove succeeded.");

            this.consulta();
        })
        .catch(error => console.log(`Error`));
    }

    consulta(){
        return(
            <div>
                {this.state.datas.map((item, i) => (
                    <ul key={item.key} className='list-group'>
                        <li className='list-group-item'>
                            {i + 1}, <span className='alert-link'>Nombre:</span> {item.nombre}, <span className='alert-link'>Monto:</span> {item.monto}
                            <span className='alert-link'></span>
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
                <form onSubmit={e => this.fSubmit(e)} className="group-form">
                
                    <div className="form-group mx-sm-3">
                        <input onChange={e => this.setState({nombre:e.target.value})} type="text" className="form-control" id='nombre' placeholder="Nombre"/>
                    </div>

                    <div className="form-group mx-sm-3">
                        <input onChange={e => this.setState({apellido:e.target.value})} type="text" className="form-control" id='apellido' placeholder="Apellido"/>
                    </div>

                    <div className="form-group mx-sm-3">
                        <input onChange={e => this.setState({direccion:e.target.value})} type="text" className="form-control" id='direccion' placeholder="Dirección"/>
                    </div>

                    <div className="form-group mx-sm-3">
                        <input onChange={e => this.setState({cedula:e.target.value})} type="text" className="form-control" id='cedula' placeholder="Cédula"/>
                    </div>

                    <div className="form-group mx-sm-3">
                        <input onChange={e => this.setState({monto:e.target.value})} type="number" className="form-control" id='monto' placeholder="Monto de Prestamos"/>
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

export default Cliente;