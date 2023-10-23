/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {getLayoutFromLocalStorage, ILayout, LayoutSetup} from '../../../../_metronic/layout/core'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useForm} from 'react-hook-form'


	



const AddWorkersPage: React.FC = () => {
  const [tab, setTab] = useState('Sidebar')
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data:any) => console.log(data);
  console.log(errors);

  const updateConfig = () => {
    setConfigLoading(true)
    try {
      LayoutSetup.setConfig(config)
      window.location.reload()
    } catch (error) {
      setConfig(getLayoutFromLocalStorage())
      setConfigLoading(false)
    }
  }

  const reset = () => {
    setResetLoading(true)
    setTimeout(() => {
      setConfig(getLayoutFromLocalStorage())
      setResetLoading(false)
    }, 1000)
  }

  return (
	<form onSubmit={handleSubmit(onSubmit)}>
		<label for="firstname">First Name</label>
		<input type="text" placeholder="First name" id="firstname" {...register("First name", {required: true, maxLength: 80})} />
		<input type="text" placeholder="Last Name" {...register} />
		<input type="text" placeholder="OIB" {...register("OIB", {})} />
		<input type="tel" placeholder="Mobile number" {...register("Mobile number", {required: true, minLength: 6, maxLength: 12})} />
		<input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
		<input type="number" placeholder="Passport number" {...register("Passport number", {})} />
		<input type="text" placeholder="Parents names" {...register("Parents names", {})} />
		<input type="datetime" placeholder="Work permit expiration date" {...register("Work permit expiration date", {})} />
		<input type="datetime" placeholder="Health certificate expiration date" {...register("Health certificate expiration date", {})} />
		<input type="checkbox" placeholder="Workplace safety certificate" {...register} />
		<input type="checkbox" placeholder="First aid" {...register("First aid", {})} />
		<input type="checkbox" placeholder="GEDA" {...register("GEDA", {})} />
		<input type="text" placeholder="Hourly wage" {...register("Hourly wage", {})} />

	<input type="submit" />
	</form>
	
  )
}

export {AddWorkersPage}


{/* <form onSubmit={handleSubmit(onSubmit)}>
<input type="text" placeholder="First name" {...register("First name", {required: true, maxLength: 80})} />
<input type="text" placeholder="Last Name" {...register} />
<input type="text" placeholder="OIB" {...register("OIB", {})} />
<input type="tel" placeholder="Mobile number" {...register("Mobile number", {required: true, minLength: 6, maxLength: 12})} />
<input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
<input type="number" placeholder="Passport number" {...register("Passport number", {})} />
<input type="text" placeholder="Parents names" {...register("Parents names", {})} />
<input type="datetime" placeholder="Work permit expiration date" {...register("Work permit expiration date", {})} />
<input type="datetime" placeholder="Health certificate expiration date" {...register("Health certificate expiration date", {})} />
<input type="checkbox" placeholder="Workplace safety certificate" {...register} />
<input type="checkbox" placeholder="First aid" {...register("First aid", {})} />
<input type="checkbox" placeholder="GEDA" {...register("GEDA", {})} />
<input type="text" placeholder="Hourly wage" {...register("Hourly wage", {})} />

<input type="submit" />
</form> */}